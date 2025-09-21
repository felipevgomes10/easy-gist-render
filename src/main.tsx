import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.component.tsx";

import "./index.styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      placeholderData: keepPreviousData,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NuqsAdapter>
  </StrictMode>,
);
