import { GithubService } from "../../common/github/github.service";
import { queryClient } from "../../common/tanstack-query/query-client.config";

const githubService = GithubService.create();

export function renderPageLoader() {
  const pathnames = location.pathname.split("/").filter(Boolean);

  const id = pathnames.at(2);
  const filename = pathnames.at(3);

  if (!id || !filename) {
    return;
  }

  const params = { id, filename };

  queryClient.ensureQueryData({
    queryKey: ["gist", params],
    queryFn: () => githubService.getGist(params),
  });
}
