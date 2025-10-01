import { GithubUtils } from "../../common/github/github.utils";
import { getGistQueryOptions } from "../../common/github/hooks/use-get-gist-query.hook";
import type { LocalStorageGist } from "../../common/github/schemas/local-storage-gist.schema";
import { LocalStorageProperty } from "../../common/local-storage/local-storage-property.enum";
import { LocalStorageService } from "../../common/local-storage/local-storage.service";
import { queryClient } from "../../common/tanstack-query/query-client.config";

const localStorageService = LocalStorageService.create();

export function renderPageLoader() {
  const pathnames = location.pathname.split("/").filter(Boolean);

  const id = pathnames.at(2);
  const filename = pathnames.at(3);

  if (!id || !filename) {
    return;
  }

  const gists = localStorageService.getItemAsArray<LocalStorageGist>(
    LocalStorageProperty.GISTS,
  );

  const foundGist = gists.find((gist) => {
    return (
      GithubUtils.identifyGist(gist.id, gist.filename) ===
      GithubUtils.identifyGist(id, filename)
    );
  });

  if (!foundGist) {
    queryClient
      .ensureQueryData(getGistQueryOptions({ id, filename }))
      .then(({ url }) => {
        localStorageService.setItem(
          LocalStorageProperty.GISTS,
          gists.concat({ id, filename, url: `${url}#file-${filename}-html` }),
        );
      });
  }
}
