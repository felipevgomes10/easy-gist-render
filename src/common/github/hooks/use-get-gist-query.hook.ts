import { queryOptions, useQuery } from "@tanstack/react-query";
import type { GetGistFetchingParams } from "../schemas/outgoing/get-gist-fetching-params.schema";
import { GithubService } from "../github.service";

const githubService = GithubService.create();

export function getGistQueryOptions(params: GetGistFetchingParams) {
  return queryOptions({
    queryKey: ["gist", params],
    queryFn: () => githubService.getGist(params),
  });
}

export function useGetGistQuery(params: GetGistFetchingParams) {
  return useQuery(getGistQueryOptions(params));
}
