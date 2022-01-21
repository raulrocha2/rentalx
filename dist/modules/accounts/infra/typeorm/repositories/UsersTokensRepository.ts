import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";
import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {

  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ refresh_token });
    return userToken;
  }

  async create({
    refresh_token,
    user_id,
    expires_token
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_token,
    });

    await this.repository.save(userToken)

    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {

    const userToken = await this.repository.findOne({
      user_id,
      refresh_token
    })

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }


}

export { UsersTokensRepository }