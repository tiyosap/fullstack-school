import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: {
      id: (await params).id,
    },
    data: {
      name: body.name,
      username: body.username,
      role: body.role,
      classId: body.classId,
    },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      class: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(updatedUser);
}
