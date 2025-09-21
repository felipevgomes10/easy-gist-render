import z from "zod";
import { GistRenderer } from "../../common/github/components/gist-renderer.component/gist-renderer.component";
import { RouteParam } from "../../common/router/enums/route-param.enum";
import { useParams } from "../../common/router/hooks/useParams.hook";

export function Component() {
  const { id, filename } = useParams(
    z.object({
      [RouteParam.GIST_ID]: z.string(),
      [RouteParam.FILENAME]: z.string(),
    }),
  );

  if (!id || !filename) {
    return null;
  }

  return (
    <div className="h-full overflow-hidden">
      <GistRenderer id={id} filename={filename} />
    </div>
  );
}

Component.displayName = "RendererComponent";
