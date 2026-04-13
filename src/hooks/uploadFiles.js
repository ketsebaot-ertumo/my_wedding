import axios from "axios";


export default async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response?.data;
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      return error;
    }
  }
  