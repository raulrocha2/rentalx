import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const carsRoutes = Router();


const createCategoryController = new CreateCarController();

carsRoutes.post("/new", ensureUserIsAdmin, createCategoryController.handle)

export { carsRoutes };