import { useGetGistQuery } from "../../hooks/use-get-gist-query.hook";
import type { GistRendererProps } from "./gist-renderer.types";

export function GistRenderer({ id, filename }: Readonly<GistRendererProps>) {
  const { data, error } = useGetGistQuery({ id, filename });

  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  return (
    <iframe srcDoc={data?.content} className="h-screen w-full border-none" />
  );
}
