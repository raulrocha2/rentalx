import { inject, injectable } from "tsyringe";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";



interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;

}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {

    const oneDay = 24;
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");

    }
    // The car rental can't less 24 hours 

    const dateNow = this.dateProvider.dateNow();
    const compareDate = this.dateProvider.compare(dateNow, expected_return_date);

    if (compareDate < oneDay) {
      throw new AppError("Invalid return time!");
    };

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };