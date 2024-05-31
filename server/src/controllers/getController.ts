import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

const prisma = new PrismaClient()
export default new Elysia()
  .get('/api', () => `hello worlds`)
  .get('/api/all-user', async () => {
    const allUser = await prisma.user.findMany({})
    return { error: false, user: allUser }
  })
  .get('/api/project/all-project', async () => {
    const projects = await prisma.project.findMany({})
    return { error: false, project: projects }
  })
  .get('/api/project/:id', async ({ params }) => {
    try {
      const project = await prisma.project.findFirst({
        where: {
          id: params.id
        }
      })
      if (!project) throw new Error('project not found!')
      return { error: false, project }
    } catch (error) {
      return { error: true, message: error }
    }
  })