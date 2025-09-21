import { createBrowserRouter } from "react-router";
import { renderRoutes } from "../../render/render.routes";
import { RoutePath } from "./enums/route-path.enum";

export const routes = createBrowserRouter(
  [
    {
      children: renderRoutes,
      lazy: () => import("./layouts/root.layout"),
    },
  ],
  { basename: RoutePath.BASE_NAME },
);
