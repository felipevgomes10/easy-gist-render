import { GetGistFetchingParams } from "./schemas/outgoing/get-gist-fetching-params.schema";
import type { Gist } from "./schemas/incoming/gist.schema";

export class GithubService {
  public static create() {
    return new GithubService();
  }

  public async getGist(fetchingParams: GetGistFetchingParams) {
    const { error, data } = GetGistFetchingParams.safeParse(fetchingParams);

    if (error) {
      throw new Error("Invalid fetching params on getGist");
    }

    const { id, filename } = data;

    const response = await fetch(`https://api.github.com/gists/${id}`);
    const gist: Gist = await response.json();

    const file = await fetch(gist.files[filename].raw_url);

    return file.text();
  }
}
