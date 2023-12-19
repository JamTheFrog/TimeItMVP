import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized";


export const checkAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  next();
};
