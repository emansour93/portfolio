import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

// GET all collections (with images)
export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ collections });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST new collection
export async function POST(req: Request) {
  try {
    const { name, slug, description, subtitle, hero, order } = await req.json();

    if (!name || !slug || !hero)
      return NextResponse.json(
        { error: "name, slug and hero required" },
        { status: 400 },
      );

    const collection = await prisma.collection.create({
      data: {
        name,
        slug,
        description: description || "",
        subtitle: subtitle || "", // ✅ added
        hero,
        order: order || 0,
      },
    });

    return NextResponse.json(collection);
  } catch (err: any) {
    if (err.code === "P2002")
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 },
      );

    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

// PATCH collection or reorder
export async function PATCH(req: Request) {
  try {
    const { id, name, slug, description, subtitle, hero, order } =
      await req.json();

    if (typeof id !== "number")
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const data: any = {};

    if (name !== undefined) data.name = name;
    if (slug !== undefined) data.slug = slug;
    if (description !== undefined) data.description = description;
    if (subtitle !== undefined) data.subtitle = subtitle || null;
    if (hero !== undefined) data.hero = hero;
    if (typeof order === "number") data.order = order;

    const updated = await prisma.collection.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE collection
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.collection.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
