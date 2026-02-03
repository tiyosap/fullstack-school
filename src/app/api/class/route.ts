import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const classes = await prisma.class.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(classes);
}

export async function POST(req: Request) {
  const { name } = await req.json();

  const newClass = await prisma.class.create({
    data: {
      name,
    },
    select: { name: true },
  });

  return Response.json({
    status: 201,
    data: newClass,
  });
}
