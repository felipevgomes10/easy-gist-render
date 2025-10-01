import { ErrorComponent } from "../../../components/error/error.component";
import { useGetGistSuspenseQuery } from "../../hooks/use-get-gist-query.hook";
import type { GistRendererProps } from "./gist-renderer.types";

export function GistRenderer({ id, filename }: Readonly<GistRendererProps>) {
  const { data, error } = useGetGistSuspenseQuery({ id, filename });

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <iframe srcDoc={data?.content} className="h-screen w-full border-none" />
  );
}
