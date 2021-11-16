import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRouters = Router();

const createRentalController = new CreateRentalController();

rentalRouters.post("/new", ensureAuthenticated, createRentalController.handle)

export { rentalRouters };