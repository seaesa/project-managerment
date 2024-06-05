import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

const prisma = new PrismaClient()
export default new Elysia()
  .delete('/api/project/delete', async ({ body }) => {
    try {
      const { id } = body as any
      await prisma.project.delete({
        where: {
          id
        }
      })
      return { error: false }
    } catch (error: any) {
      return { error: true, message: error.message }
    }
  })