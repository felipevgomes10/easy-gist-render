import { useParams as useReactRouterParams } from "react-router";

import type z from "zod";

export function useParams<T extends z.ZodType<object>>(schema: T) {
  return schema.parse(useReactRouterParams());
}
