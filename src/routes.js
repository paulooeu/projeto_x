import { Router } from "express";
import UsuarioController from "./app/controllers/UsuarioController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
routes.post("/usuario", UsuarioController.store);
routes.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
routes.post("/sessions", SessionController.store);
routes.use(authMiddleware);
export default routes;
