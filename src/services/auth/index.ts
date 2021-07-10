import { Application } from "express";
import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_ALGORITHM, JWT_VALIDITY } from "./constants";

export const attachJwtAuthMw = (app: Application): void => {
  app.use(
    expressJwt({
      secret: JWT_SECRET,
      algorithms: [JWT_ALGORITHM],
    }).unless({
      path: ["/login"],
    })
  );
};

export const generateAuthToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_VALIDITY,
  });
};
