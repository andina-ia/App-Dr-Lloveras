import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  // Debug: verificar que el token existe
  const tokenExists = !!process.env.BLOB_READ_WRITE_TOKEN;
  const tokenPrefix = process.env.BLOB_READ_WRITE_TOKEN?.slice(0, 20);
  console.log("Token exists:", tokenExists, "prefix:", tokenPrefix);

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      onBeforeGenerateToken: async () => {
        return {
          access: "private" as const,
          allowedContentTypes: [
            "video/mp4",
            "video/quicktime",
            "video/mov",
            "application/pdf",
          ],
          maximumSizeInBytes: 500 * 1024 * 1024,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload completed:", blob.url);
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    const msg = (error as Error).message;
    console.error("handleUpload error:", msg);
    // Si falla el token, intentar con la variable de entorno directamente
    return NextResponse.json({ 
      error: msg,
      debug: { tokenExists, tokenPrefix }
    }, { status: 400 });
  }
}
