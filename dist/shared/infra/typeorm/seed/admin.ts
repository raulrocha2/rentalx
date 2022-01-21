import { hash } from "bcrypt";
import createConnection from '../index';
import { v4 } from "uuid";


async function create() {
  const connection = await createConnection("localhost");

  const id = v4();
  const password = await hash("admin", 10);

  await connection.query(
    ` INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'xxxxxx')
    `
  );

  await connection.close;
}

create().then(() => console.log("User admin created"));
