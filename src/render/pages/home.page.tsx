import { useQueryClient } from "@tanstack/react-query";
import { Copy, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { href, useNavigate } from "react-router";
import { Button } from "../../common/components/button.component";
import { Card } from "../../common/components/card.component";
import { Container } from "../../common/components/container.component";
import { Input } from "../../common/components/input.component";
import { MiniCard } from "../../common/components/mini-card.component";
import { ScrollArea } from "../../common/components/scroll-area.component";
import { Title } from "../../common/components/title.component";
import { GithubUtils } from "../../common/github/github.utils";
import { getGistQueryOptions } from "../../common/github/hooks/use-get-gist-query.hook";
import type { LocalStorageGist } from "../../common/github/schemas/local-storage-gist.schema";
import type { GetGistFetchingParams } from "../../common/github/schemas/outgoing/get-gist-fetching-params.schema";
import { LocalStorageProperty } from "../../common/local-storage/local-storage-property.enum";
import { LocalStorageService } from "../../common/local-storage/local-storage.service";

const localStorageService = LocalStorageService.create();

export function Component() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const [gists, setGists] = useState(() => {
    return localStorageService.getItemAsArray<LocalStorageGist>(
      LocalStorageProperty.GISTS,
    );
  });

  function getInputValue() {
    const { value = "" } = inputRef.current ?? {};
    return GithubUtils.parseGistUrl(value);
  }

  function navigateToGist(gist: LocalStorageGist) {
    navigate(href("/:id/:filename", gist));
  }

  function prefetchGist(gist: GetGistFetchingParams) {
    queryClient.ensureQueryData(getGistQueryOptions(gist));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedUrl = getInputValue();

    if (!parsedUrl) {
      alert("Invalid Gist URL");
      return;
    }

    const foundGist = gists.find((gist) => {
      return (
        GithubUtils.identifyGist(gist.id, gist.filename) ===
        GithubUtils.identifyGist(parsedUrl.id, parsedUrl.filename)
      );
    });

    if (!foundGist) {
      localStorageService.setItem(
        LocalStorageProperty.GISTS,
        gists.concat(parsedUrl),
      );
    }

    navigateToGist(parsedUrl);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsedUrl = GithubUtils.parseGistUrl(e.target.value);

    if (!parsedUrl) {
      return;
    }

    prefetchGist(parsedUrl);
  }

  function handleClearGists() {
    localStorageService.removeItem(LocalStorageProperty.GISTS);
    localStorageService.removeItem(LocalStorageProperty.GISTS_CACHE);
  }

  function removeGist({ id, filename }: LocalStorageGist) {
    const queryOptions = getGistQueryOptions({ id, filename });

    const updatedGists = gists.filter((gist) => {
      return (
        GithubUtils.identifyGist(gist.id, gist.filename) !==
        GithubUtils.identifyGist(id, filename)
      );
    });

    setGists(updatedGists);
    localStorageService.setItem(LocalStorageProperty.GISTS, updatedGists);
    queryClient.removeQueries({ queryKey: queryOptions.queryKey });
  }

  function handleRemoveGist(
    e: React.MouseEvent<HTMLButtonElement>,
    gist: LocalStorageGist,
  ) {
    e.stopPropagation();
    removeGist(gist);
  }

  async function copyGistUrl(gist: LocalStorageGist) {
    await navigator.clipboard.writeText(gist.url);
  }

  function handleCopyGistUrl(
    e: React.MouseEvent<HTMLButtonElement>,
    gist: LocalStorageGist,
  ) {
    e.stopPropagation();
    copyGistUrl(gist);
  }

  return (
    <Container className="flex h-screen flex-col items-center justify-center gap-6 bg-gray-100 font-mono md:flex-row md:gap-4">
      <Card className="min-h-[264px]">
        <Title>Easy Gist Render</Title>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            placeholder="Enter Gist URL"
            type="text"
            onChange={handleChange}
          />
          <Button className="w-full px-4 py-3" type="submit">
            Render Gist
          </Button>
        </form>
      </Card>
      {!!gists.length && (
        <div className="flex h-[264px] w-full max-w-md flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-1 p-2">
            <Title>Recent Gists</Title>
            <Button data-variant="danger" onClick={handleClearGists}>
              Clear
            </Button>
          </div>
          <ScrollArea className="space-y-3">
            {gists.map((gist) => (
              <MiniCard
                key={`${gist.id}/${gist.filename}`}
                onClick={() => navigateToGist(gist)}
                onMouseEnter={() => prefetchGist(gist)}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm">{gist.filename}</p>
                  <div className="space-x-2">
                    <Button onClick={(e) => handleCopyGistUrl(e, gist)}>
                      <Copy />
                    </Button>
                    <Button
                      data-variant="danger"
                      onClick={(e) => handleRemoveGist(e, gist)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </MiniCard>
            ))}
          </ScrollArea>
        </div>
      )}
    </Container>
  );
}

Component.displayName = "HomePage";
