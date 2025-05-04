import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import type { TrpcRouter } from '@bonds/backend/src/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const trpc = createTRPCReact<TrpcRouter>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})

export const TrpcProvider = ({ children }: { children: ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
