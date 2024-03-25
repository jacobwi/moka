// packages/errors/src/base/BaseError.ts
export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
