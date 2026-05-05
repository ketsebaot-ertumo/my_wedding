// import API from "@/app/api/api"
import axios from "axios";
import { useEntityActions } from "./use-mutation";

import { supabase } from "@/lib/supabaseClient";
import { getGuestId } from "@/utils/guestId";
import { toast } from "sonner";
const { create, update } = useEntityActions();


export default async function uploadFiles(file) {
  try {
    // console.log("Uploading file:", file);
    const MAX_SIZE_MB = 5

    if (!file) {
      throw new Error('No media to upload')
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large! Max ${MAX_SIZE_MB}GB allowed.`)
      throw new Error(`File too large! Max ${MAX_SIZE_MB}GB allowed.`)
    }

    // const fileName = `${Date.now()}_${file.name}`;
    const guest_id = getGuestId();

    const { data, error } = await supabase.storage
      .from("media") // your bucket name
      .upload(file.name, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("media")
      .getPublicUrl(file.name);

    const result = {
      path: data.path,
      url: urlData.publicUrl
    };

    console.log("upload result:", result);

    const mediaData = { 
      url: result.url,
      filename: file.name,
      mimeType: file.type, 
      size: file.size, 
      guest_id: guest_id,
    };
    const response = await create(`media`, mediaData);
    return {...result, response};
    // return response;

  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// export default async function uploadFiles(file) {
//   const { create, update } = useEntityActions();
//   const formData = new FormData();
//   formData.append('file', file);

//   console.log('Uploading file:', file);

//   try {
//     // const response = await axios.post('media', formData, {
//     //   headers: {
//     //     'Content-Type': 'multipart/form-data',
//     //   },
//     // });

//     const response = await create(`media`, formData);

//     const result = response?.data;
//     console.log('upload result:', result);
//     return result;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     // THROW the error instead of returning it
//     // throw new Error(error instanceof Error ? error.message : 'Upload failed');
//     return Promise.reject(error instanceof Error ? error : new Error('Upload failed'));
//   }
// }


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
  