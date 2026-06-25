import { NextResponse } from "next/server";
import { getContent } from "@/lib/storage";
import { getSignedUrl } from "@/lib/signedUrls";

export async function GET() {
  const content = await getContent();
  
  const result: Record<string, any> = {};
  for (const [id, data] of Object.entries(content)) {
    result[id] = {
      videoUrl: data.videoUrl,
      videoFilename: data.videoUrl?.split('/').pop()?.split('?')[0],
      pdfUrl: data.pdfUrl ? "present" : "none",
    };
  }
  
  return NextResponse.json(result);
}
