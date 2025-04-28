export type ComposableAPIResponse<T> = {
  success: boolean;
  content: T;
  status?: number;
};
