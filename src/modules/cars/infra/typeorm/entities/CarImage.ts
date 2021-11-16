import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as idV4 } from "uuid";
import { Car } from "./Car";


@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  image_name: string;

  @Column()
  car_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = idV4();
    }
  }

}

export { CarImage };