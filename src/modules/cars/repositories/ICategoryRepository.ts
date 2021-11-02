import { Category } from "../infra/typeorm/entities/Category";




// DTO => Data transfer object
interface ICreatecategoryDTO {
    name: string;
    description: string;
}

interface ICategoryRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreatecategoryDTO): Promise<void>;
}

export { ICategoryRepository, ICreatecategoryDTO };