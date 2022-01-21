import { UserTokens } from "../infra/typeorm/entities/UserTokens";
import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";


interface IUsersTokensRepository {
  create({
    refresh_token,
    user_id,
    expires_token
  }: ICreateUsersTokensDTO): Promise<UserTokens>;
  findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };