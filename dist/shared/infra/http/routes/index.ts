import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { accountsRoutes } from "./accounts.routes";
import { authenticateRoutes } from "./authenticate.router";
import { carsRoutes } from "./cars.routes";
import { rentalRouters } from "./rental.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use("/", authenticateRoutes);

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/cars", carsRoutes);
router.use("/account", accountsRoutes);
router.use("/rental", rentalRouters);
router.use("/password", passwordRoutes);

export { router }