import { AxiosInstance } from "axios";
import { Instance } from "../config/axios";

export class BaseRepository {
  protected path: string;
  protected httpClient: AxiosInstance;

  constructor(path: string) {
    this.path = path;
    this.httpClient = Instance;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.httpClient.interceptors.request.use((request) => {
      return request;
    });
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) {
          console.error("Unknown error response on interceptor");
          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    );
  }
}
