import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { TrpcRouter } from '@bonds/backend/src/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import superjson from 'superjson';
import Cookies from 'js-cookie';
import { env } from './env.ts';

export const trpc = createTRPCReact<TrpcRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: env.VITE_BACKEND_TRPC_URL,
      transformer: superjson,
      headers: () => {
        const token = Cookies.get('token');

        return { ...(token && { Authorization: `Bearer ${token}` }) };
      },
    }),
  ],
});

export const TrpcProvider = ({ children }: { children: ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
