import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";
import { PostTypes } from "../types/postTypes";

const prisma = new PrismaClient()

export const project = new Elysia()
  // [POST] /api/create-product : create a project
  .post('/api/project/create', async ({ body }) => {
    const { name, description, leader, member } = body as any
    const product = await prisma.project.create({
      data: {
        name,
        description,
        leader,
        member
      }
    })
    return { error: false, product }
  }, {
    // specify data from body  
    type: "application/json",
    /**
     * @beforeHandle : method excute before above route be match
     * with @context is request from client
     */
    beforeHandle(context) {
      const { name, description, leader, member } = context.body as any
      if (!name || !description || !leader || !member) return { error: true, message: 'missing data, please try again!' }
    },
  })
  .post('/api/project/add-task', async ({ body }: PostTypes) => {
    const { projectId, name, description } = body;
    try {
      const task = await prisma.task.create({
        data: {
          name: name || '',
          description: description || '',
          projectId,
        }
      })
      return { error: false, task }
    } catch (err: any) {
      return { error: true, message: err.message }
    }
  })