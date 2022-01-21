import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as idV4 } from "uuid";
import { Expose } from "class-transformer";

@Entity("users")
class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "avatar_url" })
    avatar_url(): string {
        switch (process.env.DISK) {
            case "local":
                return `${process.env.API_URL_LOCAL}/avatar/${this.avatar}`
            case "s3":
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
            default:
                return null
        }
    }

    constructor() {
        if (!this.id) {
            this.id = idV4();
        }
    }


}

export { User }