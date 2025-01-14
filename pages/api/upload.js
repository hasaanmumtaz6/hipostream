import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { dbConnect } from '@/utils/dbConnect';
import Video from '@/models/Video';

export const config = {
  api: { bodyParser: false }, // Disables Next.js default body parser
};

// Ensure the uploads directory exists
const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: uploadsPath, // Path to store files
  filename: (req, file, cb) => {
    // File naming: prepend timestamp to avoid collisions
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage settings
const upload = multer({ storage }).single('video');

const handler = (req, res) => {
  if (req.method === 'POST') {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading file' });
      }

      try {
        // Connect to MongoDB
        await dbConnect();

        // Save video details (URL) to MongoDB
        const newVideo = new Video({
          url: `/uploads/${req.file?.filename}`,
        });

        await newVideo.save();

        // Respond with success message and video URL
        res.status(200).json({
          message: 'Video uploaded successfully',
          videoUrl: newVideo.url,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving video data to DB' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
