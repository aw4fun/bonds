import cn from 'classnames';
import st from './Button.module.less';
import { ReactNode } from 'react';

const Button = ({
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

export default Button;
