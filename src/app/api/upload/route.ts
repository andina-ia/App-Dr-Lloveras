import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN no configurado" }, { status: 500 });
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const jsonResponse = await handleUpload({
      body,
      request,
      token,
      onBeforeGenerateToken: async () => ({
        access: "private" as const,
        allowedContentTypes: ["video/mp4", "video/quicktime", "application/pdf"],
        maximumSizeInBytes: 500 * 1024 * 1024,
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log("✓ Upload completed:", blob.url);
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload error:", (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
