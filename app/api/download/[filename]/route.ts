import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await ctx.params; // ✅ unwrap params

    const decoded = decodeURIComponent(filename);
    const safeName = path.basename(decoded);

    const filePath = path.join(process.cwd(), "public", "files", safeName);
    const file = await fs.readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": String(file.length),
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
