export type ApiSuccessResponse<T> = {
  status: number;
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  status: number;
  message: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
