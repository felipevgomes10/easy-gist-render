import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { RouterProvider } from "react-router";
import { routes } from "./common/router/router.routes";
import {
  localStoragePersister,
  queryClient,
} from "./common/tanstack-query/query-client.config";

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <RouterProvider router={routes} />
    </PersistQueryClientProvider>
  );
}
