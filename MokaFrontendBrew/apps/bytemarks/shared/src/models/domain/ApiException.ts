// ApiException class that extends the native Error class
export class ApiException extends Error {
  public statusCode?: number; // Use `number` type for HTTP status code

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiException'; // Use the class name as a string
  }
}
