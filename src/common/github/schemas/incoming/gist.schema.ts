import z from "zod";

export const Gist = z.object({
  files: z.record(
    z.string(),
    z.object({
      raw_url: z.url(),
    }),
  ),
  html_url: z.url(),
});

export type Gist = z.infer<typeof Gist>;
