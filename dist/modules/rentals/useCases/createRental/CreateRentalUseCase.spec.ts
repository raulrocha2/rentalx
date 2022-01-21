import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoriesInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;


describe("Create Rental", () => {
  const dayTomorrow = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create new rental ", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "New car test Rental",
      daily_rate: 100,
      license_plate: "test-123",
      fine_amount: 40,
      category_id: "43211234",
      brand: "test brand"
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "654321",
      expected_return_date: dayTomorrow
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");

  });

  it("Should not be able to create a new rental if there is another open to the same User ", async () => {
    await createRentalUseCase.execute({
      car_id: "2222",
      user_id: "11111",
      expected_return_date: dayTomorrow
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "11111",
        user_id: "11111",
        expected_return_date: dayTomorrow
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user !"));

  });

  it("Should not be able to create a new rental if unavailable car", async () => {

    await createRentalUseCase.execute({
      car_id: "2222",
      user_id: "11111",
      expected_return_date: dayTomorrow
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "2222",
        user_id: "2222",
        expected_return_date: dayTomorrow
      })
    ).rejects.toEqual(new AppError("Car is unavailable !"));

  });

  it("Should not be able to create a new rental if the time is less 24 hours ", async () => {

    await expect(createRentalUseCase.execute({
      car_id: "3333",
      user_id: "4444",
      expected_return_date: dayjs().toDate()
    })

    ).rejects.toEqual(new AppError("Invalid return time !"));

  });
})