import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

const prisma = new PrismaClient()
export default new Elysia()
  .get('/api', () => `hello worlds`)
  .get('/api/all-user', async () => {
    const allUser = await prisma.user.findMany({})
    return { error: false, user: allUser }
  })