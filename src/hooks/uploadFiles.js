import API from "@/app/[locale]/api/api";
import axios from "axios";


export default async function uploadFiles(file) {
    const formData = new FormData();
    formData.append('file', file);
    console.log('Uploading file:', file);
  
    try {
      const response = await API.post('api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response?.data;
      console.log('upload result:', result);
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
       // ✅ THROW the error instead of returning it
      throw new Error(error instanceof Error ? error.message : 'Upload failed');
    }
  }


//   // app/actions/uploadFiles.ts - Cloudflare R2 Version
// 'use server'

// interface UploadResponse {
//   success: boolean
//   url?: string
//   error?: string
// }

// export default async function uploadFiles(file: File): Promise<UploadResponse> {
//   try {
//     // 1. Get signed URL from your API route
//     const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
//     const fileType = file.type
    
//     const signRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/sign?filename=${filename}&type=${fileType}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
    
//     if (!signRes.ok) {
//       throw new Error('Failed to get upload URL')
//     }
    
//     const { signedUrl, cdnUrl } = await signRes.json()
    
//     // 2. Upload directly to R2
//     const uploadRes = await fetch(signedUrl, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': fileType,
//       },
//       body: file,
//     })
    
//     if (!uploadRes.ok) {
//       throw new Error('Upload to storage failed')
//     }
    
//     console.log('✅ Upload successful:', cdnUrl)
    
//     return {
//       success: true,
//       url: cdnUrl,
//     }
    
//   } catch (error) {
//     console.error('❌ Upload error:', error)
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Upload failed',
//     }
//   }
// }
  