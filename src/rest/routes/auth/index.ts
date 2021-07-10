import { Request, Response } from "express";
import { generateAuthToken } from "../../../services/auth";

export const login = (request: Request, response: Response): void => {
  const userEmail: string = request.body?.email;
  if (!userEmail) {
    response
      .status(400)
      .send({ error: "No or Invalid email address in request" });
  } else {
    response.send({ accessToken: generateAuthToken(userEmail) });
  }
};
