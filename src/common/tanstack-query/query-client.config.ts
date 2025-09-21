import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import type { QueryKey } from "./query-client.types";

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
      placeholderData: keepPreviousData,
    },
  },
});
