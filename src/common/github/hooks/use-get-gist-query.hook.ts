import { useQuery } from "@tanstack/react-query";
import type { GetGistFetchingParams } from "../schemas/outgoing/get-gist-fetching-params.schema";
import { GithubService } from "../github.service";

const githubService = GithubService.create();

export function useGetGistQuery(params: GetGistFetchingParams) {
  return useQuery({
    queryKey: ["gist", params],
    queryFn: () => githubService.getGist(params),
  });
}
