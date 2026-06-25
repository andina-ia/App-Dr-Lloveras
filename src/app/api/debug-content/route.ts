import { NextResponse } from "next/server";
import { getContent } from "@/lib/storage";
import { list } from "@vercel/blob";

export async function GET(request: Request) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  
  // List all blobs
  const { blobs } = await list({ token });
  
  // Get content
  const content = await getContent();
  
  return NextResponse.json({ 
    blobs: blobs.map(b => ({ url: b.url, pathname: b.pathname, size: b.size })),
    content 
  });
}
