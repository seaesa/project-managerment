import Elysia, { t } from "elysia";
import getController from "../controllers/getController";
import postController from "../controllers/postController";
import putController from "../controllers/putController";
import deleteController from "../controllers/deleteController";


export default new Elysia()
  .use(getController)
  .use(postController)
  .use(putController)
  .use(deleteController)