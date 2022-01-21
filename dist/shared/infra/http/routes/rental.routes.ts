import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalByUserController";

const rentalRouters = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRouters.post("/new", ensureAuthenticated, createRentalController.handle);
rentalRouters.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRouters.get("/user/list-rentals", ensureAuthenticated, listRentalByUserController.handle);

export { rentalRouters };