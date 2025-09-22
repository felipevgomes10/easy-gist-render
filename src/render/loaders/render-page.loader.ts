import { getGistQueryOptions } from "../../common/github/hooks/use-get-gist-query.hook";
import { queryClient } from "../../common/tanstack-query/query-client.config";

export function renderPageLoader() {
  const pathnames = location.pathname.split("/").filter(Boolean);

  const id = pathnames.at(2);
  const filename = pathnames.at(3);

  if (!id || !filename) {
    return;
  }

  const params = { id, filename };

  queryClient.ensureQueryData(getGistQueryOptions(params));
}
