import { Application } from "express";
import { login } from "./auth";

export const registerRoutes = (app: Application): void => {
  app.post("/login", login);
};
