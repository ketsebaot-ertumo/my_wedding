import { google } from 'googleapis';
import path from 'path';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const KEYFILEPATH = path.join(process.cwd(), "credentials/weddingimageuploader-15f40a309ed9.json");
const FOLDER_ID = process.env.NEXT_PUBLIC_FOLDER_ID;

// Initialize Google Drive client
async function initDrive() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  return google.drive({ version: 'v3', auth });
}

// POST - Upload file
export async function POST(request) {
  try {

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    // if (!allowedTypes.includes(file.type)) {
    //   return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    // }

    const drive = await initDrive();
    const stream = Readable.from(Buffer.from(await file.arrayBuffer()));

    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: 'id,name,webViewLink,webContentLink,mimeType,createdTime',
    });

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return NextResponse.json({
      success: true,
      file: {
        id: response.data.id,
        name: response.data.name,
        url: response.data.webViewLink,
        type: response.data.mimeType.startsWith('image/') ? 'image' : 'video',
        createdAt: response.data.createdTime,
      }
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(error?.resonse?.data || "Failed to upload file",
      { status: 500 }
    );
  }
}


// GET - List files in folder
export async function GET(request) {
  try {

    const drive = await initDrive();
    
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id,name,webViewLink,webContentLink,mimeType,createdTime)',
      orderBy: 'createdTime desc',
    });

    const files = response.data.files.map(file => ({
      id: file.id,
      name: file.name,
      url: file.webViewLink,
      type: file.mimeType.startsWith('image/') ? 'image' : 'video',
      createdAt: file.createdTime,
    }));

    return NextResponse.json({ files });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(error?.resonse?.data || "Failed to upload file",
      { status: 500 }
    );
  }
}