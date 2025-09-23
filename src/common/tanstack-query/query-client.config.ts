import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import type { QueryKey } from "./query-client.types";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { removeOldestQuery } from "@tanstack/react-query-persist-client";
import { LocalStorageProperty } from "../local-storage/local-storage-property.enum";

declare module "@tanstack/react-query" {
  interface Register {
    queryKey: QueryKey;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      gcTime: Infinity,
      placeholderData: keepPreviousData,
    },
  },
});

export const localStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
  retry: removeOldestQuery,
  key: LocalStorageProperty.GISTS_CACHE,
});
