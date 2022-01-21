import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";


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

        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        req.user = {
            id: user_id,
        }

        return next();

    } catch {

        throw new AppError("Invalid token!", 401);
    }

}

