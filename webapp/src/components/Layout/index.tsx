import { Link, Outlet } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from '../../lib/routes.ts';
import st from './Layout.module.less';
import { useMe } from '../../lib/ctx.tsx';

const Layout = () => {
  const me = useMe();

  return (
    <div className={st.layout}>
      <div className={st.navigation}>
        <div className={st.logo}>idea bonds </div>
        <ul className={st.menu}>
          <li className={st.item}>
            <Link className={st.link} to={getAllIdeasRoute()}>
              Home
            </Link>
          </li>

          {me ? (
            <>
              <li className={st.item}>
                <Link className={st.link} to={getNewIdeaRoute()}>
                  New idea
                </Link>
              </li>

              <li className={st.item}>
                <Link className={st.link} to={getSignOutRoute()}>
                  Log out {me.nick}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={st.item}>
                <Link className={st.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
              <li className={st.item}>
                <Link className={st.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={st.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
