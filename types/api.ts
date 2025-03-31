export type ApiSuccessResponse<T> = {
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  message: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
