import { container } from "tsyringe"
import { ProfileUserUseCase } from "./ProfileUserUseCase"
import { Request, Response } from "express";

class ProfileUserController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await profileUserUseCase.execute(id);

    return res.json(user);
  }
}

export { ProfileUserController }