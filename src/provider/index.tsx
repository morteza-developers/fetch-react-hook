import { FC, ReactNode, createContext, useContext } from "react";
import { ICacheStrategy } from "../type";
import { MemoryCacheStrategy } from "../utils";

const FetchContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
  cacheStrategy?: ICacheStrategy;
};

type ContextType = {
  cacheStrategy: ICacheStrategy;
};
const FetchProvider: FC<Props> = ({
  children,
  cacheStrategy = new MemoryCacheStrategy(),
}) => {
  return (
    <FetchContext.Provider value={{ cacheStrategy }}>
      {children}
    </FetchContext.Provider>
  );
};
const useFetchContext = () => useContext(FetchContext);
export { useFetchContext };

export default FetchProvider;
