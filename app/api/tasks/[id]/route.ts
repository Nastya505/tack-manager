import { NextRequest, NextResponse } from "next/server";
import { createTaskSchema } from "@/app/validation-schemas";
import prisma from "@/prisma/client";



interface Props{
    params: {
        id: string
    }
}

export async function GET(request:NextRequest, {params: {id} }:Props){
    const task = await prisma.task.findUnique({
        where: {id: parseInt(id)}
    })

   if(!task){
    return NextResponse.json({error: "Task not found"}, {status: 404})
   }
   return NextResponse.json(task)
};


export async function PUT(request:NextRequest, {params: {id} }:Props){

    //запросить у бд пользователя с нужным id
    //если пользователь не был найден, возвращаем 404
    const task = await prisma.task.findUnique({
        where: {id: parseInt(id)}
    });

    if(!task){
        return NextResponse.json({error: "Task not found"}, {status: 404})
    }

    //иначе обновляем пользователя в бд
    // и возвращаем обновденного пользователя

    const updateUser = await prisma.task.update({
        where: {id: task.id},
        data: {
            title: task.title,
            description: task.description,
            completed : !task.completed
        }
    });
    return NextResponse.json(updateUser, {status: 201})
}

