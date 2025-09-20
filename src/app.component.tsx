import { useQueryState } from "nuqs";
import { GistRenderer } from "./common/github/components/gist-renderer.component/gist-renderer.component";

export function App() {
  const [gistId] = useQueryState("gistId");
  const [filename] = useQueryState("filename");

  if (!gistId || !filename) {
    return null;
  }

  return <GistRenderer gistId={gistId} filename={filename} />;
}
