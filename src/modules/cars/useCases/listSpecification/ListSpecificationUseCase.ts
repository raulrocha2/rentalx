import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

@injectable()
class ListSpecificationUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationRepository
    ) { }

    async execute(): Promise<Specification[]> {
        const specifications = await this.specificationsRepository.list();
        return specifications
    }
}


export { ListSpecificationUseCase };