import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

// GET all images
export async function GET() {
  try {
    console.log("Fetching hero images...");
    const heroImages = await prisma.heroImage.findMany({
      select: { id: true, src: true, altText: true, createdAt: true },
      orderBy: { order: "asc" },
    });
    console.log("Fetched hero images:", heroImages);
    return NextResponse.json({ heroImages });
  } catch (err) {
    console.error("Failed to fetch hero images:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST new image
export async function POST(req: Request) {
  try {
    const { src, altText, order } = await req.json();
    if (!src)
      return NextResponse.json({ error: "src required" }, { status: 400 });

    const newImage = await prisma.heroImage.create({
      data: { src, altText: altText || "", order: order || 0 },
    });
    return NextResponse.json(newImage);
  } catch (err) {
    console.error("Failed to create hero image:", err);
    return NextResponse.json(
      { error: "Could not create image" },
      { status: 500 },
    );
  }
}
// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.heroImage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// PATCH to reorder images
export async function PATCH(req: Request) {
  try {
    const { id, newOrder } = await req.json();
    if (typeof id !== "number" || typeof newOrder !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedImage = await prisma.heroImage.update({
      where: { id },
      data: { order: newOrder },
    });

    return NextResponse.json(updatedImage);
  } catch (err) {
    console.error("Failed to update hero image:", err);
    return NextResponse.json(
      { error: "Could not update image" },
      { status: 500 },
    );
  }
}
