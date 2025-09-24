import z from "zod";

export const GetGistResponse = z.object({
  url: z.url(),
  content: z.string(),
});

export type GetGistResponse = z.infer<typeof GetGistResponse>;
