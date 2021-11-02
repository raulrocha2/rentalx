
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../repositories/in-memory/UserRepositoryInMermory";
import { CreateUserUseCase } from "../useCases/createUse/CreatateUserUseCase";


import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "111111",
            email: "test@email.com",
            password: "psw123123",
            name: "UserTest"
        };

        await createUserUseCase.execute(user);

        const userCreated = await authenticateUserCase.execute({
            email: user.email,
            password: user.password
        });

        expect(userCreated).toHaveProperty("token");
    });

    it("should not be able to authenticate a user that not exists", async () => {

        expect(async () => {

            await authenticateUserCase.execute({
                email: 'wrong@email.com',
                password: 'pawdWrong',
            });
        }).rejects.toBeInstanceOf(AppError)

    });

    it("should not be able to authenticate a user with incorrect password", async () => {

        expect(async () => {

            const user: ICreateUserDTO = {
                driver_license: "111111",
                email: "fail@email.com",
                password: "psw123123",
                name: "User Fail"
            };

            await createUserUseCase.execute(user);

            await authenticateUserCase.execute({
                email: user.email,
                password: 'wrong123',
            });
        }).rejects.toBeInstanceOf(AppError)

    });
})