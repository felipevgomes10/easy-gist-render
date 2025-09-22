import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { href, useNavigate } from "react-router";
import { Button } from "../../common/components/button.component";
import { Card } from "../../common/components/card.component";
import { Container } from "../../common/components/container.component";
import { Input } from "../../common/components/input.component";
import { Title } from "../../common/components/title.component";
import { GithubUtils } from "../../common/github/github.utils";
import { getGistQueryOptions } from "../../common/github/hooks/use-get-gist-query.hook";
import type { LocalStorageGist } from "../../common/github/schemas/local-storage-gist.schema";
import { LocalStorageProperty } from "../../common/local-storage/local-storage-property.enum";
import { LocalStorageService } from "../../common/local-storage/local-storage.service";

const localStorageService = LocalStorageService.create();

export function Component() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  function getInputValue() {
    const { value = "" } = inputRef.current ?? {};
    const parsedUrl = GithubUtils.parseGistUrl(value);

    return parsedUrl;
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

    localStorageService.setItem(
      LocalStorageProperty.GISTS,
      gists.concat(parsedUrl),
    );

    navigate(href(":id/:filename", parsedUrl));
  }

  function handleChange() {
    const parsedUrl = getInputValue();

    if (!parsedUrl) {
      return;
    }

    queryClient.ensureQueryData(getGistQueryOptions(parsedUrl));
  }

  return (
    <Container className="flex h-screen items-center justify-center bg-gray-100 font-mono">
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
    </Container>
  );
}

Component.displayName = "HomePage";
