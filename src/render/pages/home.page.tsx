import { useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../common/components/button.component";
import { Card } from "../../common/components/card.component";
import { Container } from "../../common/components/container.component";
import { Input } from "../../common/components/input.component";
import { Title } from "../../common/components/title.component";
import { GithubUtils } from "../../common/github/github.utils";

export function Component() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { value = "" } = inputRef.current ?? {};
    const parsedUrl = GithubUtils.parseGistUrl(value);

    if (!parsedUrl) {
      alert("Invalid Gist URL");
      return;
    }

    navigate(`${parsedUrl.id}/${parsedUrl.filename}`);
  }

  return (
    <Container className="flex h-screen items-center justify-center bg-gray-100 font-mono">
      <Card>
        <Title>Easy Gist Render</Title>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input ref={inputRef} placeholder="Enter Gist URL" type="text" />
          <Button type="submit">Render Gist</Button>
        </form>
      </Card>
    </Container>
  );
}

Component.displayName = "HomePage";
