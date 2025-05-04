import { TrpcProvider } from './lib/trpc.tsx'
import AllIdeasPage from './pages/AllIdeasPage'

export const App = () => (
  <TrpcProvider>
    <AllIdeasPage />
  </TrpcProvider>
)
