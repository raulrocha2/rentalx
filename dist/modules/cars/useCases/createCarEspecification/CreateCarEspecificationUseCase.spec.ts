import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoriesInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarEspecificationUseCase";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {

  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory,
    );
  });

  it("Should not be able to add a new specification to car not exists", async () => {
    const car_id = "123456";
    const specifications_id = ["654321"]

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      })
    ).rejects.toEqual(new AppError("Cars does not exists !"))
  });

  it("Should be able to add a new specification to the car", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car Test Specification",
      description: "Carro completo cor prata ",
      daily_rate: 70,
      license_plate: "test-111",
      fine_amount: 10,
      brand: "TestCarSpecification",
      category_id: "category_id_d6a6d",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "Name 1 Specification",
      description: "Description 1 Specification"
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
})