import { useQueryClient } from "@tanstack/react-query";
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

  const [gists] = useState(() => {
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

    const url = getInputValue();

    if (!url) {
      alert("Invalid Gist URL");
      return;
    }

    const foundGist = gists.find((gist) => {
      return gist.id === url.id && gist.filename === url.filename;
    });

    if (!foundGist) {
      localStorageService.setItem(
        LocalStorageProperty.GISTS,
        gists.concat(url),
      );
    }

    navigateToGist(url);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = GithubUtils.parseGistUrl(e.target.value);

    if (!url) {
      return;
    }

    prefetchGist(url);
  }

  return (
    <Container className="flex h-screen flex-col items-center justify-center gap-6 bg-gray-100 font-mono md:flex-row md:gap-4">
      <Card className="h-[264px]">
        <Title>Easy Gist Render</Title>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            placeholder="Enter Gist URL"
            type="text"
            onChange={handleChange}
          />
          <Button type="submit">Render Gist</Button>
        </form>
      </Card>
      {!!gists.length && (
        <div className="flex h-[264px] w-full max-w-md flex-col gap-2">
          <Title>Recent Gists</Title>
          <ScrollArea className="space-y-3">
            {gists.map((gist) => (
              <MiniCard
                key={`${gist.id}/${gist.filename}`}
                onClick={() => navigateToGist(gist)}
                onMouseEnter={() => prefetchGist(gist)}
              >
                <p className="truncate text-sm">{gist.filename}</p>
              </MiniCard>
            ))}
          </ScrollArea>
        </div>
      )}
    </Container>
  );
}

Component.displayName = "HomePage";
