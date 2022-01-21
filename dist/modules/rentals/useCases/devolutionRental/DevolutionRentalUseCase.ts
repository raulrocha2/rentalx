import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

  constructor(

    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

  ) { }

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);
    const minimum_daily_rental = 1;
    let totalRental = 0;
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    const dateNow = this.dateProvider.dateNow();

    let dailyRental = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (dailyRental <= 0) {
      dailyRental = minimum_daily_rental;
    }

    const delayRental = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    if (delayRental > 0) {

      const calculateDelay = delayRental * car.fine_amount;
      totalRental = calculateDelay;
    }

    totalRental += dailyRental * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalRental;

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }

}
export { DevolutionRentalUseCase };