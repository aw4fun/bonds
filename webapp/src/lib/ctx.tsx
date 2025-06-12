import type { TrpcRouterOutput } from '@bonds/backend/src/router';
import { createContext, ReactNode, useContext } from 'react';
import { trpc } from './trpc.tsx';

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me'];
};

export const AppReactContext = createContext<AppContext>({
  me: null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isFetching, isLoading, isError, error } = trpc.getMe.useQuery();

  return (
    <AppReactContext.Provider value={{ me: data?.me || null }}>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error?.message}</p>
      ) : (
        children
      )}
    </AppReactContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppReactContext);
};

export const useMe = () => {
  const { me } = useAppContext();
  return me;
};
