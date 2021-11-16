import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayTomorrow = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory;
    dayjsDateProvider = new DayjsDateProvider;
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("Should be able to create new rental ", async () => {

    const rental = await createRentalUseCase.execute({
      car_id: "123456",
      user_id: "654321",
      expected_return_date: dayTomorrow
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");

  });

  it("Should not be able to create a new rental if there is another open to the same User ", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "2222",
        user_id: "11111",
        expected_return_date: dayTomorrow
      });

      await createRentalUseCase.execute({
        car_id: "11111",
        user_id: "11111",
        expected_return_date: dayTomorrow
      });
    }).rejects.toBeInstanceOf(AppError);

  });

  it("Should not be able to create a new rental if there is another open to the same Car ", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "2222",
        user_id: "11111",
        expected_return_date: dayTomorrow
      });

      await createRentalUseCase.execute({
        car_id: "2222",
        user_id: "2222",
        expected_return_date: dayTomorrow
      });
    }).rejects.toBeInstanceOf(AppError);

  });

  it("Should not be able to create a new rental if the time is less 24 hours ", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "3333",
        user_id: "4444",
        expected_return_date: dayjs().toDate()
      });

    }).rejects.toBeInstanceOf(AppError);

  });
})