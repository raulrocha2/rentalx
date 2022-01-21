
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUse/CreateUserUseCase";
import { RefreshTokenUseCase } from "../refreshToken/RefreshTokenUseCase";





import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
//let refreshTokenUseCase: RefreshTokenUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        //refreshTokenUseCase = new RefreshTokenUseCase(usersTokensRepositoryInMemory, dateProvider);
        authenticateUserCase = new AuthenticateUserUseCase(
            userRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
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

        await expect(
            authenticateUserCase.execute({
                email: 'wrong@email.com',
                password: 'pawdWrong',
            })
        ).rejects.toEqual(new AppError("Email or password incorrect !"))

    });

    it("should not be able to authenticate a user with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "111111",
            email: "fail@email.com",
            password: "psw123123",
            name: "User Fail"
        };

        await createUserUseCase.execute(user);

        expect(
            authenticateUserCase.execute({
                email: user.email,
                password: 'wrong123',
            })
        ).rejects.toEqual(new AppError("Email or password incorrect !"))

    });
})