import { inject, injectable } from "tsyringe";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";

interface IRequest {
  token: string,
  password: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token Invalid!")
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_token,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }

    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 10);

    await this.userRepository.create(user);

    await this.usersTokensRepository.deleteById(user.id);
  }
}

export { ResetPasswordUseCase }