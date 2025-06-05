import { RoundType } from "@/types/round";
import { BaseRepository } from "./base";
import { IRound } from "../interface/round";

export class RoundRepository extends BaseRepository {
  constructor() {
    super("round");
  }

  async create(id: number, data: RoundType): Promise<IRound> {
    const response = await this.httpClient.post(`${this.path}/${id}`, data);
    return response.data;
  }
}
