import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  async execute(token: string): Promise<ITokenResponse> {

    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndToken(user_id, token);

    if (!userToken) {
      throw new AppError("Refresh Token invalid or not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_token = this.dateProvider.addDays(auth.refresh_token_expires_days);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.refresh_token_expires_in
    });

    await this.usersTokensRepository.create({
      refresh_token,
      user_id,
      expires_token,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    });

    return {
      refresh_token,
      token: newToken,
    };

  }
}

export { RefreshTokenUseCase }