import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// POST add image to collection
export async function POST(req: Request) {
  try {
    const { collectionId, src, altText, order } = await req.json();
    if (!collectionId || !src)
      return NextResponse.json(
        { error: "collectionId and src required" },
        { status: 400 },
      );

    const image = await prisma.collectionImage.create({
      data: { collectionId, src, altText: altText || "", order: order || 0 },
    });
    return NextResponse.json(image);
  } catch (err) {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

// PATCH reorder or update image
export async function PATCH(req: Request) {
  try {
    const { id, src, altText, order } = await req.json();
    const data: any = {};
    if (src !== undefined) data.src = src;
    if (altText !== undefined) data.altText = altText;
    if (typeof order === "number") data.order = order;

    const updated = await prisma.collectionImage.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 },
    );
  }
}

// DELETE image
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.collectionImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
