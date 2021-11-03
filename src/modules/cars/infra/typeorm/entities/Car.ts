import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as idV4 } from "uuid";
import { Category } from "./Category";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  is_available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  cateogry: Category;

  @Column()
  category_id: string;

  constructor() {
    if (!this.id) {
      this.id = idV4();
      this.is_available = true;
    }
  }

}
export { Car }