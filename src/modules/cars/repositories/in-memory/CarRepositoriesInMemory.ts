import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate);
    return car;
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;

  }

  async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => {
      if (
        car.is_available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return carsAvailable;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id);
    return car;
  }

}
export { CarsRepositoryInMemory };