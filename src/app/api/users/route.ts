import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      username: true,
      role: true,
    },
  });

  return Response.json({
    status: 200,
    data: users,
  });
}

export async function POST(req: Request) {
  const { name, username, password, role } = await req.json();

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      username,
      password: hashPassword,
      role: role ?? "STUDENT",
    },
    select: {
      name: true,
      username: true,
      role: true,
    },
  });

  return NextResponse.json({
    status: 201,
    data: user,
  });
}
