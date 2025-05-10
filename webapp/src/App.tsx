import AllIdeasPage from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc.tsx';

export const App = () => (
  <TrpcProvider>
    <AllIdeasPage />
  </TrpcProvider>
);
