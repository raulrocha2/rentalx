import "reflect-metadata";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoriesInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });


  it("should be able to create a new car", async () => {

    const car = {
      name: "Test Car",
      description: "Car test description",
      daily_rate: 10,
      license_plate: "zxc-222",
      fine_amount: 5,
      brand: "brand test",
      category_id: "category_id"
    }

    await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
      category_id: car.category_id
    });

    const carCreated = await carsRepositoryInMemory.findByLicensePlate(car.license_plate);

    expect(carCreated).toHaveProperty('license_plate');
  });

  it("Should not be able to create a car with exists license plate", () => {
    expect(async () => {
      const car = {
        name: "Test Car",
        description: "Car test description",
        daily_rate: 10,
        license_plate: "zxc-222",
        fine_amount: 5,
        brand: "brand test",
        category_id: "category_id"
      }

      await createCarUseCase.execute({
        name: car.name,
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
        category_id: car.category_id
      });

    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new car with field available true by default", async () => {

    const car = await createCarUseCase.execute({
      name: "New Car Availabel",
      description: "New Car Availabel",
      daily_rate: 100,
      license_plate: "abc-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id"
    });

    console.log(car);

    expect(car.is_available).toBe(true)
  })
})