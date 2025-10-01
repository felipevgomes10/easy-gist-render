import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GetGistFetchingParams } from "../schemas/outgoing/get-gist-fetching-params.schema";
import { GithubService } from "../github.service";

const githubService = GithubService.create();

export function getGistQueryOptions({ id, filename }: GetGistFetchingParams) {
  return queryOptions({
    queryKey: ["gist", { id, filename }],
    queryFn: () => githubService.getGist({ id, filename }),
  });
}

export function useGetGistQuery(params: GetGistFetchingParams) {
  return useQuery(getGistQueryOptions(params));
}

export function useGetGistSuspenseQuery(params: GetGistFetchingParams) {
  return useSuspenseQuery(getGistQueryOptions(params));
}
