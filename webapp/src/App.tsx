import AllIdeasPage from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc.tsx';
import ViewIdeaPage from './pages/ViewIdeaPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes.ts';
import Layout from './components/layout';
import './styles/global.less';
import NewIdeaPage from './pages/NewIdeaPage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOut';

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route path={getSignOutRoute()} Component={SignOutPage} />

        <Route element={<Layout />}>
          <Route path={getSignUpRoute()} Component={SignUpPage} />
          <Route path={getSignInRoute()} Component={SignInPage} />
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
