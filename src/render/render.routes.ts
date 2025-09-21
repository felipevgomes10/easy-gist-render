import type { RouteObject } from "react-router";
import { RoutePath } from "../common/router/enums/route-path.enum";
import { RouteParam } from "../common/router/enums/route-param.enum";
import { renderPageLoader } from "./loaders/render-page.loader";

export const renderRoutes = [
  {
    index: true,
    lazy: () => import("./pages/home.page"),
  },
  {
    path: `/${RoutePath.RENDER}/:${RouteParam.GIST_ID}/:${RouteParam.FILENAME}`,
    loader: renderPageLoader,
    lazy: () => import("./pages/render.page"),
  },
] satisfies RouteObject[];
