// app/api/users/route.ts
import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      // don't send passwords to the client
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// Create a new user
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}

// Update a user
export async function PATCH(req: Request) {
  try {
    const { id, name, email, password } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const data: any = { name, email };
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// Delete a user
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
