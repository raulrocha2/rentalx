import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { accountsRoutes } from "./accounts.routes";
import { authenticateRoutes } from "./authenticate.router";

const router = Router();

router.use("/", authenticateRoutes);

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);

router.use("/accounts", accountsRoutes);

export { router }