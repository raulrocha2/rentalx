import { app } from "./app";

const port = 3333;
app.listen(port, () => {
  console.log(`App listening on ${port} port in docker rentalx!`);
});
