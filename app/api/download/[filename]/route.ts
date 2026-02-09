import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const MIME: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc: "application/msword",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ppt: "application/vnd.ms-powerpoint",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  txt: "text/plain; charset=utf-8",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await ctx.params;

    const decoded = decodeURIComponent(filename);
    const safeName = path.basename(decoded);

    const filePath = path.join(process.cwd(), "public", "files", safeName);
    const file = await fs.readFile(filePath);

    const ext = path.extname(safeName).slice(1).toLowerCase();
    const contentType = MIME[ext] ?? "application/octet-stream";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": String(file.length),
        // optional but helps iOS/old caches behave
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
