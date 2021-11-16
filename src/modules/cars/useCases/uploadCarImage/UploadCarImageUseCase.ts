import { inject, injectable } from "tsyringe";
import { CarsImagesRespository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
class UploadCarImageUseCase {

  constructor(
    @inject("CarsImagesRespository")
    private carsImagesRespository: CarsImagesRespository
  ) { }

  async execute({ car_id, image_name }: IRequest): Promise<void> {
    image_name.map(async (image) => {
      await this.carsImagesRespository.create(car_id, image)
    });
  }
}

export { UploadCarImageUseCase };