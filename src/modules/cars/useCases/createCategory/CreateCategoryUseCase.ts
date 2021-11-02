import { AppError } from "@shared/errors/AppError";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute({ description, name }: IRequest): Promise<void> {

        const categoryALreadyExist = await this.categoriesRepository.findByName(name);

        if (categoryALreadyExist) {
            throw new AppError("Category Already exists")
        }

        this.categoriesRepository.create({ name, description });
    }
}


export { CreateCategoryUseCase };