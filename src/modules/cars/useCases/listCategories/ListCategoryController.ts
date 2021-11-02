import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoryController {

    async handle(req: Request, res: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const categories = await listCategoriesUseCase.execute();

        return res.json(categories)
    }
}

export { ListCategoryController };