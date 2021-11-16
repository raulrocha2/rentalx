import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoriesInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("Should be able to list all avaiable cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car Test 01",
      description: "Carro completo cor prata ",
      daily_rate: 70,
      license_plate: "abc-111",
      fine_amount: 10,
      brand: "Test",
      category_id: "d6a6d4f9-9946-45c9-a2ad-00829700b855"
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car])

  });

  it("Should be able to list all avaiable cars by name", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car02 Test",
      description: "Carro completo cor prata ",
      daily_rate: 70,
      license_plate: "abc-222",
      fine_amount: 10,
      brand: "BrandTest",
      category_id: "d6a6d4f9-9946-45c9-a2ad-00829700b855"
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car02 " });
    expect(cars).toEqual([car])

  });

  it("Should be able to list all avaiable cars by brand", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car03",
      description: "Carro completo cor prata ",
      daily_rate: 70,
      license_plate: "abc-333",
      fine_amount: 10,
      brand: "BrandTest",
      category_id: "d6a6d4f9-9946-45c9-a2ad-00829700b855"
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Brand" });
    expect(cars).toEqual([car])

  });


  it("Should be able to list all avaiable cars by category_id", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car04",
      description: "Carro completo cor prata ",
      daily_rate: 70,
      license_plate: "abc-444",
      fine_amount: 10,
      brand: "BrandTest",
      category_id: "1234"
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: "585" });
    expect(cars).toEqual([car])

  });
})