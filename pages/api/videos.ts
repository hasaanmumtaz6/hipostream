import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/dbConnect";
import Video from "@/models/Video";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // Connect to MongoDB
      await dbConnect();

      // Fetch all videos from the database
      const videos = await Video.find();

      // Return the list of videos
      res.status(200).json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Error fetching videos" });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
