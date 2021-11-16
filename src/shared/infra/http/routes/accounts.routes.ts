import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUse/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/updateUserCase/UpdateUserAvatarController";


const accountsRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

accountsRoutes.post("/", createUserController.handle);

accountsRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { accountsRoutes };