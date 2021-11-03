import { getRepository, Repository } from "typeorm";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository, ICreatecategoryDTO } from "@modules/cars/repositories/ICategoryRepository";




class CategoriesRepository implements ICategoryRepository {

    private repository: Repository<Category>;
    //private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreatecategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}
export { CategoriesRepository }