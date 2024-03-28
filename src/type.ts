export type IStatus = "success" | "loading" | "error";
export type OnFinishType<R, I> = {
  status: "error" | "success";
  response?: R;
  payload: I;
};

type OnErrorType = {
  message?: string;
};

export type UseFetchProps<D, I, R> = {
  autoFetch?: boolean;
  enableLoading?: boolean;
  initialData?: D;
  onSuccess?: (res: R, payload: I) => void;
  defaultParams?: Partial<I>;
  beforeAutoFetch?: () => Partial<I> | undefined;
  onError?: (error: OnErrorType, payload: I) => void;
  onFinish?: (message: string, options: OnFinishType<R, I>) => void;
  setMessage?: (res: R) => string;
  onDataSetter?: (data: R) => D;
  defaultStatus?: IStatus;
  catchKey?: string;
  onCache?: (data: D) => void;
  justCache?: boolean;
  cacheStrategy?: ICacheStrategy;
};

export type Fetcher<I, R, O> = (data: I, option?: O) => Promise<R>;
export type ResponseFetcher<R> = {
  status: "error" | "success";
  response?: R;
  message?: string;
};

export type UseFetch<D, I, R, O> = {
  isPending: boolean;
  isError: boolean;
  data: D;
  reFetch: (
    data?: Partial<I>,
    configs?: Options<O>
  ) => Promise<ResponseFetcher<R> | never>;
  status: IStatus;
  setData: (data: D) => void;
};

export interface Options<O> {
  keepDefaultParams?: boolean;
  requestOptions?: O;
}

export interface ICacheStrategy {
  setItem: <T extends unknown>(key: string, data: T) => void;
  getItem: <T extends unknown>(key: string) => T;
  removeItem: (key: string) => boolean;
  clear: () => void;
}
