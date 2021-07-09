import { Application } from "express";
import expressJwt from "express-jwt";

export const attachJwtAuthMw = (app: Application): void => {
  app.use(
    expressJwt({
      secret: String(process.env.JWT_SECRET),
      algorithms: ["HS256"],
    }).unless({
      // TODO: Remove graphql route once auth route done
      path: ["/login", "/graphql"],
    })
  );
};
