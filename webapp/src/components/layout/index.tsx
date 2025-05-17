import { Link, Outlet } from 'react-router-dom';
import { getAllIdeasRoute, getNewIdeaRoute } from '../../lib/routes.ts';
import st from './Layout.module.less';

const Layout = () => {
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
          <li className={st.item}>
            <Link className={st.link} to={getNewIdeaRoute()}>
              New idea
            </Link>
          </li>
        </ul>
      </div>
      <div className={st.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
