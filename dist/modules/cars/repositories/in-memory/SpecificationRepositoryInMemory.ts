import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { isDecorator } from "typescript";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {

  specifications: Specification[] = [];


  list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name, description
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specificationsIds = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return specificationsIds;
  }

}

export { SpecificationRepositoryInMemory };