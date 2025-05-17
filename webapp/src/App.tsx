import AllIdeasPage from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc.tsx';
import ViewIdeaPage from './pages/ViewIdeaPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes.ts';
import Layout from './components/layout';
import './styles/global.less';
import NewIdeaPage from './pages/NewIdeaPage';

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={getAllIdeasRoute()} Component={AllIdeasPage} />
          <Route path={getNewIdeaRoute()} Component={NewIdeaPage} />
          <Route
            path={getViewIdeaRoute(viewIdeaRouteParams)}
            Component={ViewIdeaPage}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </TrpcProvider>
);
