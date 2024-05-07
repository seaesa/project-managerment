import router from "./router/router";

const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`app running on port: http://localhost:${port}`))