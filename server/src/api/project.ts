import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

const prisma = new PrismaClient()

export const project = new Elysia()
  // [POST] /api/create-product : create a project
  .post('/api/create-product', async ({ body }) => {
    const { name, description, leader, member } = body as any
    const product = await prisma.project.create({
      data: {
        name,
        description,
        leader,
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
      if (!name || !description || !leader || !member) return { error: true, message: 'data nt found!' }
    },
  })