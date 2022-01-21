import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import "reflect-metadata";
import { CreateUserUseCase } from "./CreateUserUseCase";






let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            userRepositoryInMemory
        );
    })

    it("should be able to create a new user", async () => {
        const user = {
            name: "Name Test",
            email: "test@email.com",
            driver_license: "123456",
            password: "pswdtest123",
        }

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            driver_license: user.driver_license,
            password: user.password,
        });


        const userCreated = await userRepositoryInMemory.findByEmail(user.email);

        expect(userCreated).toHaveProperty("id");
    });

    // it("should not be able to create a new category with name exists", async () => {

    //     expect(async () => {
    //         const category = {
    //             description: "New Category Test",
    //             name: "Category-Test",
    //         }

    //        await createCategoryUseCase.execute({
    //            name: category.name,
    //            description: category.description
    //        });


    //        await createCategoryUseCase.execute({
    //             name: category.name,
    //             description: category.description
    //         });
    //     }).rejects.toBeInstanceOf(AppError)
    // });
})