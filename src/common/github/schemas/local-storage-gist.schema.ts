import z from "zod";

export const LocalStorageGist = z.object({
  id: z.string(),
  filename: z.string(),
  url: z.url(),
});

export type LocalStorageGist = z.infer<typeof LocalStorageGist>;
