import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.json(404).json({
      message: "Invalid request",
    });
    return;
  }
  console.log(token);
  const data = jwt.verify(token, process.env.JWT_SECRET!);
  console.log(data,"data is");
  // @ts-ignore
  req.user = data;
  next();
};
