import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('/api/videos');
        setVideos(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Uploaded Videos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4">
          {videos.map((video, index) => (
            <li key={index} className="mt-2">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Video {index + 1}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Videos;
