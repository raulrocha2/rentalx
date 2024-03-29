import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {

  private messageMail: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {

    this.messageMail.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };