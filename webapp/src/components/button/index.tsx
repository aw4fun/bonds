import cn from 'classnames';
import st from './Button.module.less';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  loading = false,
}: {
  children: ReactNode;
  loading?: boolean;
}) => {
  return (
    <button
      className={cn(st.button, { [st.disabled]: loading })}
      type="submit"
      disabled={loading}
    >
      {loading ? 'Submitting...' : children}
    </button>
  );
};

export const LinkButton = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link className={st.button} to={to}>
      {children}
    </Link>
  );
};
