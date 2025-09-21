import { Request } from "./schemas/request.schema";

export class HttpService {
  public static create() {
    return new HttpService();
  }

  public async sendRequest<T = unknown>(request: Request) {
    const { url, options } = Request.parse(request);
    const { type, ...rest } = options;

    const response = await fetch(url, rest);

    return HttpService[type](response) as T;
  }

  private static async json(response: Response) {
    return response.json();
  }

  private static async text(response: Response) {
    return response.text();
  }
}
