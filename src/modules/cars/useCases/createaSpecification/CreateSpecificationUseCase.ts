import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationRepository
    ) { }

    async execute({ description, name }: IRequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError("Specification Already exists")
        }

        this.specificationRepository.create({ name, description })
    }
}
export { CreateSpecificationUseCase };