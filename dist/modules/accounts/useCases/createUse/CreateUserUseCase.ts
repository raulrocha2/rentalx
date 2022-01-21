import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";


@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({
        name,
        email,
        password,
        driver_license
    }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("E-mail already exists");
        }
        const passwordHash = await hash(password, 10);

        await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });
    }
}

export { CreateUserUseCase };