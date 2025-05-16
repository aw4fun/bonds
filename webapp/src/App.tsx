import AllIdeasPage from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc.tsx';
import ViewIdeaPage from './pages/ViewIdea';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes.ts';
import Layout from './components/layout';

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={getAllIdeasRoute()} Component={AllIdeasPage} />
          <Route
            path={getViewIdeaRoute(viewIdeaRouteParams)}
            Component={ViewIdeaPage}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </TrpcProvider>
);
