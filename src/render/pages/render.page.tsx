import { useQueryClient } from "@tanstack/react-query";
import { Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { Button } from "../../common/components/button.component";
import { GistRenderer } from "../../common/github/components/gist-renderer.component/gist-renderer.component";
import { getGistQueryOptions } from "../../common/github/hooks/use-get-gist-query.hook";
import type { LocalStorageGist } from "../../common/github/schemas/local-storage-gist.schema";
import { LocalStorageProperty } from "../../common/local-storage/local-storage-property.enum";
import { LocalStorageService } from "../../common/local-storage/local-storage.service";
import { RouteParam } from "../../common/router/enums/route-param.enum";
import { useParams } from "../../common/router/hooks/useParams.hook";

const localStorageService = LocalStorageService.create();

export function Component() {
  const { id, filename } = useParams(
    z.object({
      [RouteParam.GIST_ID]: z.string(),
      [RouteParam.FILENAME]: z.string(),
    }),
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const gists = localStorageService.getItemAsArray<LocalStorageGist>(
      LocalStorageProperty.GISTS,
    );

    const foundGist = gists.find((gist) => {
      return gist.id === id && gist.filename === filename;
    });

    if (!foundGist) {
      queryClient
        .ensureQueryData(getGistQueryOptions({ id, filename }))
        .then(({ url }) => {
          localStorageService.setItem(
            LocalStorageProperty.GISTS,
            gists.concat({ id, filename, url }),
          );
        });
    }
  }, [filename, id, queryClient]);

  function handleGistRefresh() {
    queryClient.invalidateQueries({ queryKey: ["gist", { id, filename }] });
  }

  if (!id || !filename) {
    return null;
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="fixed top-1 left-1 space-x-2">
        <Button onClick={() => navigate("/")}>
          <Home />
        </Button>
        <Button onClick={handleGistRefresh}>
          <RefreshCw />
        </Button>
      </div>
      <GistRenderer id={id} filename={filename} />
    </div>
  );
}

Component.displayName = "RendererComponent";
