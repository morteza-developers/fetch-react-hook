import { FC, ReactNode, createContext, useEffect, useContext } from "react";

const FetchContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};
const CATCH = new Map();


type ContextType = {
  setCatch: <T>(key: string, data: T) => void;
  getCatch: <T>(key: string) => T | undefined;
  remove: (key: string) => boolean;
  clear: () => void;
  has: (key: string) => boolean;
};
const FetchProvider: FC<Props> = ({ children }) => {
  const setCatch = <T extends unknown>(key: string, data: T): void => {
    CATCH.set(key, data);
  };

  const getCatch = <T extends unknown>(key: string): T => {
    return CATCH.get(key);
  };

  const remove = (key: string): boolean => {
    return CATCH.delete(key);
  };
  const clear = () => CATCH.clear();
  const has = (key: string) => CATCH.has(key);


  useEffect(() => {
    return () => clear();
  }, []);
  return (
    <FetchContext.Provider value={{ setCatch, getCatch, remove, clear, has }}>
      {children}
    </FetchContext.Provider>
  );
};
const useFetchContext = () => useContext(FetchContext);
export { useFetchContext };

export default FetchProvider;
