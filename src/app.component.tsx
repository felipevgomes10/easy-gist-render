import { useQueryState } from "nuqs";
import { GistRenderer } from "./common/github/components/gist-renderer.component/gist-renderer.component";

export function App() {
  const [id] = useQueryState("gistId");
  const [filename] = useQueryState("filename");

  if (!id || !filename) {
    return null;
  }

  return (
    <div className="h-full overflow-hidden">
      <GistRenderer id={id} filename={filename} />
    </div>
  );
}
