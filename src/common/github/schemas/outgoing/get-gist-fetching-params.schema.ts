import z from "zod";

export const GetGistFetchingParams = z
  .object({
    id: z.string(),
    filename: z.string(),
  })
  .transform(({ id, filename }) => ({
    id,
    filename: `${filename}.html`,
  }));

export type GetGistFetchingParams = z.input<typeof GetGistFetchingParams>;
