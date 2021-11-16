import { inject, injectable } from "tsyringe";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"


interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {

  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) { }

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const carsAvailable = await this.carRepository.findAvailable(
      category_id, brand, name
    );
    return carsAvailable;
  }
}

export { ListAvailableCarsUseCase };