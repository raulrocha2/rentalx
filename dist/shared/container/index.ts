import { container } from "tsyringe";
import "@shared/container/providers/";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";




//ICategoryRepository
container.registerSingleton<ICategoryRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

//ISpecificationRepository
container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

//IUserRepository
container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

//ICarRepository
container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
);

//CarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
);


//RentalRepository
container.registerSingleton<IRentalRepository>(
    "RentalRepository",
    RentalRepository
);

// UsersTokensRepository
container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)