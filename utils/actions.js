'use server';
import prisma from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createTask = async (formData) => {
  const content = formData.get('content');
  await prisma.task.create({
    data: {
      content: content,
    },
  });
  revalidatePath('/tasks');
};

const Task = z.object({
  content: z.string().min(2),
});
export const createTaskCustom = async (prevState, formData) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const content = formData.get('content');
  try {
    Task.parse({ content });
    await prisma.task.create({
      data: {
        content,
      },
    });
    revalidatePath('/tasks');
    return { message: 'success' };
  } catch (error) {
    return { message: 'error' };
  }
};

export const deleteTask = async (prevState, formData) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const id = formData.get('id');
    await prisma.task.delete({
      where: { id },
    });
    revalidatePath('/tasks');
    return { message: 'success' };
  } catch (error) {
    return { message: 'error' };
  }
};

export const getTask = async (id) => {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const editTask = async (prevState, formData) => {
  try {
    const content = formData.get('content');
    Task.parse({ content });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await prisma.task.update({
      where: { id: formData.get('id') },
      data: {
        content: content,
        completed: formData.get('completed') === 'on' ? true : false,
      },
    });
    revalidatePath('/tasks');
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};
