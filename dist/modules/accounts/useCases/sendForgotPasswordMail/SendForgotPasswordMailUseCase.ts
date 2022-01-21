import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";
//import { EtherealMailProvider } from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";



@injectable()
class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
  ) { }

  async execute(email: string): Promise<void> {

    const user = await this.userRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("Email does not exists");
    }

    const token = uuidV4();

    const expires_hours = this.dateProvider.addHours(auth.refresh_token_expires_hours);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_token: expires_hours
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL_DEV}${token}`,
    }

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath,
    )
  }
}

export { SendForgotPasswordMailUseCase }