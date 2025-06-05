import { BaseRepository } from "./base";
import { IUser } from "../interface/user";
import { UserType } from "@/types/user";

export class UserRepository extends BaseRepository {
  constructor() {
    super("user");
  }

  async create(data: Partial<UserType>): Promise<IUser> {
    const response = await this.httpClient.post(`${this.path}`, data);
    return response.data;
  }

  async getMe(id: number): Promise<IUser> {
    const response = await this.httpClient.get(`${this.path}/${id}`);
    return response.data;
  }

  async update(id: number, points: number): Promise<IUser> {
    const response = await this.httpClient.put(`${this.path}/${id}`, points);
    return response.data;
  }
}
