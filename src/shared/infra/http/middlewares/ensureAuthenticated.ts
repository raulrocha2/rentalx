import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";


interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {

        const { sub: user_id } = verify(token, "secretKeyJWT") as IPayload;

        const userRepository = new UserRepository();
        const user = userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        req.user = {
            id: user_id,
        }

        next();

    } catch {

        throw new AppError("Invalid token!", 401);
    }

}

