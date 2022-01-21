import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUse/CreateUserUseCase";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;


describe("Send Forgot Mail ", () => {


  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );

  });

  it("Should be able to send a forgot password mail to user", async () => {

    const sendMail = jest.spyOn(mailProvider, "sendMail");
    const generationTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      driver_license: "3957876755",
      email: "ir@ip.ma",
      name: "Jim Foster",
      password: "password123"
    });

    await sendForgotPasswordMailUseCase.execute("ir@ip.ma");

    expect(sendMail).toHaveBeenCalled();
    expect(generationTokenMail).toHaveBeenCalled();

  });

  it("Should not be able to send an email if user does not exists", async () => {

    await expect(
      sendForgotPasswordMailUseCase.execute("bivcu@wawalboh.tf")
    ).rejects.toEqual(new AppError("Email does not exists"));
  });

});
