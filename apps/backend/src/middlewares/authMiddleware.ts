import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response,next : NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    res.json(404).json({
      message: "Invalid request",
    });
    return;
  }
  const data = jwt.verify(token,process.env.JWT_SECRET!);
  // @ts-ignore
  req.user = data;
  next();
};
