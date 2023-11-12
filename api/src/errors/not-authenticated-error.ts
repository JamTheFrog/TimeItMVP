import { CustomError } from "./custom-error";

export class NotAuthenticatedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authenticated");

    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }
  serializeErrors() {
    return [{ message: "You are not authenticated" }];
  }
}
