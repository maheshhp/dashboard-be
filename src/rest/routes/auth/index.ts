import { Request, Response } from "express";
import { generateAuthToken } from "../../../services/auth";

export const login = (request: Request, response: Response): void => {
  const userEmail: string = request.body?.email;
  if (!userEmail) {
    response.status(400).send({ error: "No/Invalid email address" });
  } else {
    response.send({ token: generateAuthToken(userEmail) });
  }
};
