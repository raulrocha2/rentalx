
interface ICreateUsersTokensDTO {

  refresh_token: string;
  user_id: string;
  expires_token: Date;
}

export { ICreateUsersTokensDTO }