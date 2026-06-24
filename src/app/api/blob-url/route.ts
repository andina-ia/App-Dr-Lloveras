import { issueSignedToken, presignUrl } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get("url");
  if (!blobUrl) return NextResponse.json({ error: "Falta url" }, { status: 400 });

  try {
    const pathname = new URL(blobUrl).pathname.slice(1);
    const signedToken = await issueSignedToken({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      validUntil: Date.now() + 3600 * 1000,
      operations: ["get"],
    });
    const result = await presignUrl(signedToken, {
      operation: "get",
      pathname,
      access: "private",
    });
    return NextResponse.json({ url: result.presignedUrl });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
