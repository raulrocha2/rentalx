import { inject, injectable, singleton } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";


import { AppError } from "@shared/errors/AppError";

import auth from "@config/auth";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";




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
    refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect !");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect !");
        }

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        const refreshToken = sign({ email }, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.refresh_token_expires_in
        })

        const refreshTokenExpiresDate = this.dateProvider.addDays(auth.refresh_token_expires_days)

        await this.usersTokensRepository.create({
            refresh_token: refreshToken,
            user_id: user.id,
            expires_token: refreshTokenExpiresDate
        })


        const tokenReturn: IResponse = {
            token,
            refreshToken,
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