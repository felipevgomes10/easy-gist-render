import z from "zod";

export const GetGistFetchingParams = z.object({
  id: z.string(),
  filename: z.string(),
});

export type GetGistFetchingParams = z.input<typeof GetGistFetchingParams>;
