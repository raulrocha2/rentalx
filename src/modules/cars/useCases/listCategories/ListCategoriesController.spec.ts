import request from "supertest";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 } from "uuid";


let connection: Connection;
describe("List Categories Controller", () => {

  beforeAll(async () => {

    connection = await createConnection("localhost");
    await connection.runMigrations();

    const id = v4();
    const password = await hash("paswdtest", 10);

    await connection.query(
      ` INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'user-test', 'test@rentalx.com', '${password}', true, 'now()', 'xxxxxx')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should be able list all categories", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "test@rentalx.com",
        password: "paswdtest"
      });

    const { refreshToken } = responseToken.body;

    await request(app).post("/categories/new")
      .send({
        name: "Test Category",
        description: "Category Cars Test"
      })
      .set({
        Authorization: `Bearer ${refreshToken}`
      });


    const response = await request(app).get("/categories")
      .set({
        Authorization: `Bearer ${refreshToken}`
      });

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty("id");
  });

});