import { createBrowserRouter } from "react-router";
import { renderRoutes } from "../../render/render.routes";

export const routes = createBrowserRouter([
  {
    children: renderRoutes,
    lazy: () => import("./layouts/root.layout"),
  },
]);
