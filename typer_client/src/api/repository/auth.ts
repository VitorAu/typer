import { AuthType } from "@/types/auth";
import { IAuth } from "../interface/auth";
import { BaseRepository } from "./base";

export class AuthRepository extends BaseRepository {
  constructor() {
    super("auth")
  }

  async login(data: AuthType): Promise<IAuth> {
    const response = await this.httpClient.post(`${this.path}/login`, data);
    return response.data;
  }
}
