import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";


export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction) {

  const { id } = req.user;
  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (user.isAdmin === false) {
    throw new AppError("Permission denied!", 401);
  }
  return next();

}

