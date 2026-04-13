import { NextResponse } from "next/server";
import r2 from "@/lib/r2Client";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";


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


export async function POST(req) {
  const { key, type, uploaderName } = await req.json();

  // Simple JSON storage for free users
  const dbPath = path.join(process.cwd(), "uploads.json");
  const data = fs.existsSync(dbPath)
    ? JSON.parse(fs.readFileSync(dbPath))
    : [];

  data.push({
    key,
    type,
    uploader: uploaderName || "guest",
    url: `https://${process.env.R2_BUCKET}.${process.env.R2_ENDPOINT.replace("https://","")}/${key}`,
    createdAt: new Date(),
  });

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: "Saved", key });
}

