import { BaseError } from "../base/BaseError";

export class APIError extends BaseError {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
