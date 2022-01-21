import { container } from "tsyringe";
import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

class ResetPasswordController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordController }