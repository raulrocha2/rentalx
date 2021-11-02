import { Specification } from "../infra/typeorm/entities/Specification";





// DTO => Data transfer object
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    list(): Promise<Specification[]>;
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ICreateSpecificationDTO, ISpecificationRepository }