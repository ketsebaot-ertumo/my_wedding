// /api/images/route.js or similar (must be server-side)
import axios from "axios";


export async function GET() {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;
  const FOLDER = "wedding_uploads";

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return new Response("Cloudinary environment variables missing", { status: 500 });
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`;
  const auth = {
    username: API_KEY,
    password: API_SECRET,
  };

  try {
    const res = await axios.get(url, {
      auth,
      params: {
        type: "upload",
        prefix: `${FOLDER}/`,
        with_field: ["tags", "context"],
        max_results: 100,
        with_deleted: false,
      },
    });

    return new Response(JSON.stringify(res.data.resources.filter(img => !img.placeholder && img.bytes > 0)), { status: 200 });
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error.response?.data || error);
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), { status: 500 });
  }
}