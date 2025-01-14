import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Automatically switches based on environment
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
