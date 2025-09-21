import type { RouteObject } from "react-router";
import { RouteParam } from "../common/router/enums/route-param.enum";
import { renderPageLoader } from "./loaders/render-page.loader";

export const renderRoutes = [
  {
    index: true,
    lazy: () => import("./pages/home.page"),
  },
  {
    path: `:${RouteParam.GIST_ID}/:${RouteParam.FILENAME}`,
    loader: renderPageLoader,
    lazy: () => import("./pages/render.page"),
  },
] satisfies RouteObject[];
