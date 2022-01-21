import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";


class UserRepositoryInMemory implements IUserRepository {

    users: User[] = [];

    async create({
        name,
        email,
        driver_license,
        password,

    }: ICreateUserDTO): Promise<void> {

        const user = new User();

        Object.assign(user, {
            name,
            email,
            driver_license,
            password,

        });

        this.users.push(user);

    }

    async findByEmail(email: string): Promise<User> {

        const user = this.users.find((user) => user.email === email);
        return user;

    }

    async findById(id: string): Promise<User> {

        return this.users.find(user => user.id === id);
    }

}

export { UserRepositoryInMemory };