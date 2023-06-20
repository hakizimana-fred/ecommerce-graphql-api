import { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

export type MyContext = {
  req: Request;
  res: Response;
  next: NextFunction;
  prisma: PrismaClient;
};
