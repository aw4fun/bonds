import { useNavigate } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getSignInRoute } from '../../lib/routes.ts';

export const SignOutPage = () => {
  const navigate = useNavigate();

  const trpcUtils = trpc.useContext();

  useEffect(() => {
    Cookies.remove('token');
    trpcUtils.invalidate().then(() => {
      navigate(getSignInRoute());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Loading...</div>;
};
