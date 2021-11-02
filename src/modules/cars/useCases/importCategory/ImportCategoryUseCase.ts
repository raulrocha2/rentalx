import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import csvParser from 'csv-parse';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';


interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoryRepository
    ) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParser();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path)
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories);
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoryRepository.findByName(name);

            if (!existCategory) {
                await this.categoryRepository.create({
                    name,
                    description,
                });
            }
        })

    }
}

export { ImportCategoryUseCase };