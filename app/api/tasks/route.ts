import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { createTaskSchema } from "@/app/validation-schemas";


export async function GET(request: NextRequest) {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  // Получаем из запроса тело и сохраняем.
  const body = await request.json();

  // Выполняем валидацию
  const validation = createTaskSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Если валидация успешно выполнилась, сохраняем переданный task в БД.
  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      completed : false
    }
  });

  // Возвращаем результат
  return NextResponse.json(newTask, { status: 201 });
}


export function PUT(request: NextRequest) {
  const body = request.json();
  return NextResponse.json(body);
}
