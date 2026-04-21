import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
