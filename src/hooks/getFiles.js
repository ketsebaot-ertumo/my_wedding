
import axios from "axios";


export default async function getFiles() {
  
    try {
      const response = await axios.get('/api/upload', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const result = response?.data;
      return result;
    } catch (error) {
      console.error('Error fetching files:', error);
      return error;
    }
  }
  
