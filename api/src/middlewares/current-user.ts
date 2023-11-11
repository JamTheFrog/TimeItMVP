import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../config/keys";

interface UserPayload {
  id: string;
  username: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = jwt.verify(token, keys.JWT_SECRET_KEY!) as UserPayload;
    req.currentUser = decodedToken;
  } catch (error) {

  }
  next();
};
