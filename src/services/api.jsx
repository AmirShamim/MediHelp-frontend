import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

export const summarizePrescription = async (file, options = {}) => {
  const formData = new FormData();
  formData.append('document', file);
  if (options.documentType) formData.append('documentType', options.documentType);
  if (options.language) formData.append('language', options.language);

  try {
    const response = await api.post('/summarize', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export default api;
