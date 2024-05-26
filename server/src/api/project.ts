import Elysia from "elysia";

export const project = new Elysia()
  .post('/api/create-product', async () => {

  }, {
    type: "application/json",
    beforeHandle(context) {

    },
  })