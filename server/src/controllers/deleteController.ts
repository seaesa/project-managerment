import Elysia from "elysia";

export default new Elysia()
  .get('/api/home', () => `hi`)