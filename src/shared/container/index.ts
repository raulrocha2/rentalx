import { container } from "tsyringe";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepositories";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepositories";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";




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
// container.registerSingleton<ICarsRepository>(
//     "CarRepository",
//     CarRepository    
// )