// utils/cloudinary.js
'use client';

import axios from "axios";

const folder_name = "wedding_uploads";
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

// Upload image to Cloudinary
export async function uploadImageToCloudinary(file) {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("CLOUD_NAME or UPLOAD_PRESET is not defined in environment variables");
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folder_name);

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
    return res?.data?.secure_url;
  }
  

  // // fetch images from Cloudinary
  // export async function fetchCloudinaryImages() {
  //   if(!CLOUD_NAME) {
  //     throw new Error("CLOUD_NAME is not defined in environment variables");
  //   }
  
  //   const res = await axios.get(
  //     `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${folder_name}.json`
  //   );
  
  //   if (!res.ok) throw new Error("Failed to fetch images from Cloudinary");
  //   // const data = await res.json();
  //   return res?.data?.resources;
  // }
  