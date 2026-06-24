import { NextResponse } from "next/server";

// Proxy para servir archivos privados de Vercel Blob con soporte de streaming
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) return new NextResponse("Falta url", { status: 400 });

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return new NextResponse("Token no configurado", { status: 500 });

  // Pasar el header Range para soporte de streaming de video
  const range = request.headers.get("range");
  const fetchHeaders: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };
  if (range) fetchHeaders["Range"] = range;

  try {
    const res = await fetch(url, { headers: fetchHeaders });
    if (!res.ok && res.status !== 206) {
      return new NextResponse("Error al obtener archivo", { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const contentLength = res.headers.get("content-length");
    const contentRange = res.headers.get("content-range");

    const headers: HeadersInit = {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Cache-Control": "private, max-age=3600",
    };
    if (contentLength) headers["Content-Length"] = contentLength;
    if (contentRange) headers["Content-Range"] = contentRange;

    return new NextResponse(res.body, {
      status: range ? 206 : 200,
      headers,
    });
  } catch (e) {
    return new NextResponse("Error", { status: 500 });
  }
}
