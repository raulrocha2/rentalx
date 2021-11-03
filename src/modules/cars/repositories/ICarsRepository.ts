import { Car } from "../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";



interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;

}

export { ICarsRepository };