import Elysia from "elysia";
import { auth } from "../api/auth";
import { project } from "../api/project";

const postController = new Elysia()
  .use(auth)
  .use(project)

export default postController