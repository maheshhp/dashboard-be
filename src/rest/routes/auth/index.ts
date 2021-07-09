import { Request, Response } from "express";

export const login = (request: Request, response: Response): void => {
  // TODO: Implement JWT generation logic
  response.send("Login success");
};
