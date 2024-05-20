import { HttpStatusCode } from 'axios';

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  errorMessage?: string;
  httpStatusCode?: HttpStatusCode;

  constructor(params: {
    success: boolean;
    data?: T;
    errorMessage?: string;
    httpStatusCode?: HttpStatusCode;
  }) {
    this.success = params.success;
    this.data = params.data;
    this.errorMessage = params.errorMessage;
    this.httpStatusCode = params.httpStatusCode;
  }

  // Check if the response is successful
  get IsSuccess(): boolean {
    return this.success;
  }

  // Check if the response has data
  get HasData(): boolean {
    return !!this.data; // Simplified check for data existence
  }
}
