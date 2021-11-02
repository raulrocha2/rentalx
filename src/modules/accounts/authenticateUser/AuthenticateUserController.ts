import { Request, Response } from "express"
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {

    async hanlde(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        try {

            const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

            const authenticateToken = await authenticateUserUseCase.execute({email, password});

            return res.json(authenticateToken);

        } catch (err) {
            
            return res.json({error: err.message})
        }
        
    }
}

export { AuthenticateUserController };