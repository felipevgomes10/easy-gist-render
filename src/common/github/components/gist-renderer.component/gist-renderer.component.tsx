import { useEffect, useState } from "react";
import type { GistRendererProps } from "./gist-renderer.types";

export const GistRenderer = ({
  gistId,
  filename,
}: Readonly<GistRendererProps>) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGistContent = async () => {
      try {
        const gistUrl = `https://api.github.com/gists/${gistId}`;
        const gistResponse = await fetch(gistUrl);
        if (!gistResponse.ok) {
          throw new Error(`Failed to fetch Gist: ${gistResponse.statusText}`);
        }
        const gistData = await gistResponse.json();
        const file = gistData.files[filename];
        console.log(gistData);
        if (!file) {
          throw new Error(`File not found in Gist: ${filename}`);
        }
        const rawUrl = file.raw_url;
        const contentResponse = await fetch(rawUrl);
        if (!contentResponse.ok) {
          throw new Error(
            `Failed to fetch file content: ${contentResponse.statusText}`,
          );
        }
        const textContent = await contentResponse.text();
        console.log(textContent);
        setContent(textContent);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      }
    };

    fetchGistContent();
  }, [gistId, filename]);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <iframe
      srcDoc={content}
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
};
