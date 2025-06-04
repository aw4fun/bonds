import AllIdeasPage from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc.tsx';
import ViewIdeaPage from './pages/ViewIdeaPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignUpRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes.ts';
import Layout from './components/layout';
import './styles/global.less';
import NewIdeaPage from './pages/NewIdeaPage';
import { SignUpPage } from './pages/SignUpPage';

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={getSignUpRoute()} Component={SignUpPage} />
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
