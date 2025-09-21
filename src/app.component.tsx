import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { routes } from "./common/router/router.routes";
import { queryClient } from "./common/tanstack-query/query-client.config";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}
