import { Link, Outlet } from 'react-router-dom';
import { getAllIdeasRoute } from '../../lib/routes.ts';

const Layout = () => {
  return (
    <div>
      <p>
        <b>idea bonds</b>
      </p>
      <ul>
        <li>
          <Link to={getAllIdeasRoute()}>Home</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
