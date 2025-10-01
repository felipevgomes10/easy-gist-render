import { Suspense } from "react";
import { Outlet } from "react-router";
import { LoadingComponent } from "../../components/loading/loading.component";

export function Component() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Outlet />
    </Suspense>
  );
}

Component.displayName = "RootLayout";
