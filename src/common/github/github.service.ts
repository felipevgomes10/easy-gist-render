import { GetGistFetchingParams } from "./schemas/outgoing/get-gist-fetching-params.schema";
import type { Gist } from "./schemas/incoming/gist.schema";
import { HttpService } from "../http/http.service";
import { RequestType } from "../http/enums/request-type.enum";
import { GetGistResponse } from "./schemas/incoming/gist-response.schema";

export class GithubService {
  private constructor(private readonly httpService: HttpService) {}

  public static create(httpService = HttpService.create()) {
    return new GithubService(httpService);
  }

  public async getGist(fetchingParams: GetGistFetchingParams) {
    const { error, data } = GetGistFetchingParams.safeParse(fetchingParams);

    if (error) {
      throw new Error("Invalid fetching params on getGist");
    }

    const { id, filename } = data;
    const request = { url: `https://api.github.com/gists/${id}` };

    const gist = await this.httpService.sendRequest<Gist>(request);

    const content = await this.httpService.sendRequest<string>({
      url: gist.files[filename].raw_url,
      options: {
        type: RequestType.TEXT,
      },
    });

    return GetGistResponse.parse({
      url: gist.html_url,
      content,
    });
  }
}
