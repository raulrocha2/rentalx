import { container } from "tsyringe";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";




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
)