import React, { useState } from 'react';
import axios from 'axios';

const Upload: React.FC = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!video) {
      setMessage('Please select a video.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);

    setLoading(true);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`Video uploaded successfully: ${res.data.videoUrl}`);
    } catch (error) {
      setMessage('Error uploading video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Upload Video</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mt-4"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload Video'}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Upload;
