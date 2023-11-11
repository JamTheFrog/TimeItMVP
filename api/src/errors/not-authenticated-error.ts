import { CustomError } from "./custom-error";

export class NotAuthenticatedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Niste Autentifikovani");

    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }
  serializeErrors() {
    return [{ message: "Niste autentifikovani" }];
  }
}
