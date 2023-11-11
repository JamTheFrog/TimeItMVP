import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 403;

  constructor() {
    super("Niste Autorizovani");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: "Niste autorizovani" }];
  }
}
