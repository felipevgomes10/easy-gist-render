import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { href, useNavigate } from "react-router";
import { Button } from "../../common/components/button.component";
import { Card } from "../../common/components/card.component";
import { Container } from "../../common/components/container.component";
import { Input } from "../../common/components/input.component";
import { MiniCard } from "../../common/components/mini-card.component";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const gists = localStorageService.getItemAsArray<LocalStorageGist>(
    LocalStorageProperty.GISTS,
  );
  const queryClient = useQueryClient();

  function getInputValue() {
    const { value = "" } = inputRef.current ?? {};
    const parsedUrl = GithubUtils.parseGistUrl(value);

    return parsedUrl;
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

    const gists = localStorageService.getItemAsArray<LocalStorageGist>(
      LocalStorageProperty.GISTS,
    );
    const foundGist = gists.find((gist) => gist.id === parsedUrl.id);

    if (!foundGist) {
      localStorageService.setItem(
        LocalStorageProperty.GISTS,
        gists.concat(parsedUrl),
      );
    }

    navigateToGist(parsedUrl);
  }

  function handleChange() {
    const parsedUrl = getInputValue();

    if (!parsedUrl) {
      return;
    }

    prefetchGist(parsedUrl);
  }

  return (
    <Container className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100 font-mono">
      <Card>
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
      <div className="mt-8 flex w-full max-w-md flex-col gap-1 space-y-4">
        <Title>Recent Gists</Title>
        {gists.map((gist) => (
          <MiniCard
            key={`${gist.id}/${gist.filename}`}
            onClick={() => navigateToGist(gist)}
            onMouseEnter={() => prefetchGist(gist)}
          >
            <p className="truncate text-sm">{gist.filename}</p>
          </MiniCard>
        ))}
      </div>
    </Container>
  );
}

Component.displayName = "HomePage";
