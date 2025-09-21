import { RequestMethod } from "../enums/request-method.enum";
import { RequestType } from "../enums/request-type.enum";

export const DEFAULT_REQUEST_OPTIONS = {
  method: RequestMethod.GET,
  type: RequestType.JSON,
};
