import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../models/dto/ApiResponse';
type ApiErrorResponse = {
  message: string;
};
export async function handleApiRequest<T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const response = await request();
    return new ApiResponse<T>({
      success: true,
      data: response.data, // 'data' is part of AxiosResponse
      httpStatusCode: response.status, // 'status' is part of AxiosResponse
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('API request failed:', axiosError);

    let errorMessage = 'An unexpected error occurred';
    if (axiosError.response) {
      // Use type assertion here
      const errorData = axiosError.response.data as ApiErrorResponse;
      errorMessage = errorData.message || axiosError.response.statusText;
    } else if (axiosError.request) {
      errorMessage = 'The request was made but no response was received';
    }

    return new ApiResponse<T>({
      success: false,
      errorMessage: errorMessage,
      httpStatusCode: axiosError.response?.status,
    });
  }
}
