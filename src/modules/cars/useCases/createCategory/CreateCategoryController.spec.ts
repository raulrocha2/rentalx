import request from "supertest";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 } from "uuid";


let connection: Connection;
describe("Create Category Controller", () => {

  beforeAll(async () => {

    connection = await createConnection("localhost");
    await connection.runMigrations();

    const id = v4();
    const password = await hash("admin", 10);

    await connection.query(
      ` INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'xxxxxx')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should be able to create a new Category", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentalx.com",
        password: "admin"
      });

    const { refreshToken } = responseToken.body;

    const response = await request(app).post("/categories/new")
      .send({
        name: "SUV",
        description: "Category Cars SUV"
      })
      .set({
        Authorization: `Bearer ${refreshToken}`
      });


    expect(response.status).toBe(201);
  });

  it("should not be able to create category if already exists ", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentalx.com",
        password: "admin"
      });

    const { refreshToken } = responseToken.body;

    const response = await request(app).post("/categories/new")
      .send({
        name: "SUV",
        description: "Category Cars SUV"
      })
      .set({
        Authorization: `Bearer ${refreshToken}`
      });


    expect(response.status).toBe(400);
  });

  it("should not be able to create category without token ", async () => {

    const response = await request(app).post("/categories/new")
      .send({
        name: "TEST-CATEGORY2",
        description: "TEST-CATEGORY2"
      });


    expect(response.status).toBe(400);
  });
});