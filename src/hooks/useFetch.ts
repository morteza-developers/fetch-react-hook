import { useEffect, useState } from "react";
import {
  Fetcher,
  IStatus,
  Options,
  ResponseFetcher,
  UseFetch,
  UseFetchProps,
} from "../type";
import { useFetchContext } from "../provider";
const defaultsConfigs = {
  keepDefaultParams: true,
  requestOptions: undefined,
};
const useFetch = <D, I extends unknown, R, O>(
  fetcher: Fetcher<I, R, O>,
  {
    autoFetch = true,
    enableLoading = true,
    initialData,
    onSuccess = () => null,
    defaultParams,
    beforeAutoFetch = () => undefined,
    onError = () => null,
    onFinish = () => null,
    setMessage = (res: any) => res?.data?.message,
    onDataSetter,
    defaultStatus,
    catchKey,
    onCache = () => null,
    justCache = false,
  }: UseFetchProps<D, I, R> = {}
): UseFetch<D, I, R, O> => {
  const { setCatch, getCatch } = useFetchContext();
  const getDefaultStatus = (): IStatus => {
    if (defaultStatus) return defaultStatus;
    if (!enableLoading) return "success";
    return autoFetch ? "loading" : "success";
  };
  const [status, setStatus] = useState<IStatus>(getDefaultStatus);
  const [data, setData] = useState<D>(initialData as D);

  const sendFetch = async (
    data?: Partial<I>,
    configs: Options<O> = defaultsConfigs
  ): Promise<ResponseFetcher<R> | never> => {
    const { keepDefaultParams, requestOptions } = configs;
    const mergedData = mergeData(
      keepDefaultParams ? defaultParams : undefined,
      data
    );
    try {
      if (enableLoading) setStatus("loading");
      const res = await fetcher(mergedData, requestOptions);
      if (onDataSetter) {
        const callBackData: D | null = onDataSetter(res);
        if (callBackData) {
          if (catchKey) {
            setCatch<D>(catchKey, callBackData);
            onCache(callBackData);
          }
          !justCache && setData(callBackData);
        }
      }

      handleSuccessRequest(res, mergedData);
      return {
        status: "success",
        response: res,
        message: setMessage(res),
      };
    } catch (e: any) {
      handleErrorRequest(e, mergedData);
      throw e;
    }
  };

  const handleFetch = async (
    data?: Partial<I>,
    configs?: Options<O>
  ): Promise<ResponseFetcher<R> | never> => await sendFetch(data, configs);

  const getDataFromCatch = (): D | undefined => {
    if (catchKey) return getCatch(catchKey);
    return undefined;
  };

  const mergeData = (defaultParams?: Partial<I>, data?: Partial<I>): I => {
    if (defaultParams && data) {
      if (typeof data == "object") {
        return { ...defaultParams, ...data } as I;
      }
      if (Array.isArray(data) && Array.isArray(defaultParams)) {
        return [...defaultParams, ...data] as I;
      }
    }
    if (data) return data as I;
    return defaultParams as I;
  };

  const handleSuccessRequest = (res: R, payload: I) => {
    setStatus("success");
    onSuccess(res, payload);
    onFinish(setMessage(res), { status: "success", response: res, payload });
  };

  const handleErrorRequest = (e: any, payload: I) => {
    onError(e, payload);
    onFinish(e.message, { status: "error", response: undefined, payload });
    setStatus("error");
  };

  useEffect(() => {
    if (catchKey) {
      const catchData = getDataFromCatch();
      if (catchData) {
        onCache(catchData);
        !justCache && setData(catchData);
        setStatus("success");
      } else {
        if (autoFetch) {
          handleFetch(beforeAutoFetch());
        }
      }
    } else {
      if (autoFetch) {
        handleFetch(beforeAutoFetch());
      }
    }
  }, []);

  const handleSetData = (newValue: D): void => {
    setData(newValue);
    if (catchKey) setCatch<D>(catchKey, newValue);
  };
  return {
    isPending: status === "loading",
    isError: status == "error",
    data,
    reFetch: handleFetch,
    status,
    setData: handleSetData,
  };
};

export default useFetch;
