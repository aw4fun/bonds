import AllIdeasPage from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc.tsx';
import ViewIdeaPage from './pages/ViewIdea';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAllIdeasRoute, getViewIdeaRoute } from './lib/routes.ts';

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route path={getAllIdeasRoute()} Component={AllIdeasPage} />
        <Route
          path={getViewIdeaRoute({ ideaNick: ':ideaNick' })}
          Component={ViewIdeaPage}
        />
      </Routes>
    </BrowserRouter>
  </TrpcProvider>
);
