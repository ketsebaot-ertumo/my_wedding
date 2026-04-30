import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dbPath = path.join(process.cwd(), "uploads.json");
  if (!fs.existsSync(dbPath)) return NextResponse.json([]);

  const data = JSON.parse(fs.readFileSync(dbPath));
  return NextResponse.json(data);
}
