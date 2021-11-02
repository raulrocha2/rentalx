import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as idV4 } from "uuid";


@Entity("specifications")
class Specification {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;


    constructor() {
        if (!this.id) {
            this.id = idV4();
        }
    }
}

export { Specification };