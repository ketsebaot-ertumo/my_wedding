import { NextResponse } from "next/server";
import r2 from "@/lib/r2Client";
import { nanoid } from "nanoid";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename") || "file";
  const contentType = searchParams.get("type") || "application/octet-stream";

  const key = `${Date.now()}-${nanoid()}-${filename}`;

  const signedUrl = await r2.getSignedUrlPromise("putObject", {
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ContentType: contentType,
    Expires: 60 * 10, // URL valid for 10 minutes
  });

  // URL to fetch/view via CDN
  const cdnUrl = `https://${process.env.R2_BUCKET}.${process.env.R2_ENDPOINT.replace("https://","")}/${key}`;

  return NextResponse.json({ signedUrl, key, cdnUrl });
}
