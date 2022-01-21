import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {


  usersTokens: UserTokens[] = [];

  async create({
    refresh_token,
    user_id,
    expires_token
  }: ICreateUsersTokensDTO): Promise<UserTokens> {

    const userToken = new UserTokens();

    Object.assign(userToken, {
      refresh_token,
      user_id,
      expires_token
    });

    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find((user) => {
      user.id === user_id && user.refresh_token === refresh_token
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find((user) => {
      user.refresh_token === refresh_token
    });

    return userToken;
  }

}

export { UsersTokensRepositoryInMemory };