import { inject, injectable, singleton } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";


import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "../repositories/IUserRepository";




interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
        isAdmin: boolean;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({}, "secretKeyJWT", {
            subject: user.id,
            expiresIn: "7d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },

        }
        return tokenReturn
    }
}

export { AuthenticateUserUseCase };