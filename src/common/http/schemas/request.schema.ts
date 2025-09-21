import z from "zod";
import { DEFAULT_REQUEST_OPTIONS } from "../constants/default-request-options.constant";
import { RequestType } from "../enums/request-type.enum";
import { RequestMethod } from "../enums/request-method.enum";

export const Request = z.object({
  url: z.url(),
  options: z
    .object({
      method: z.enum(RequestMethod).optional(),
      type: z.enum(RequestType),
    })
    .optional()
    .default(DEFAULT_REQUEST_OPTIONS),
});

export type Request = z.input<typeof Request>;
