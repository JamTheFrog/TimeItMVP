import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized";
import { UserRoles } from "../models/user";

export const checkAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser!.role !== UserRoles.Admin) {
    throw new NotAuthorizedError();
  }

  next();
};
