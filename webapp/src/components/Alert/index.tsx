import cn from 'classnames';
import { ReactNode } from 'react';

import st from './Alert.module.less';

export type AlertProps = {
  color: 'red' | 'green';
  hidden?: boolean;
  children: ReactNode;
};
const Alert = ({ color, children, hidden }: AlertProps) => {
  if (hidden) {
    return null;
  }

  return <div className={cn(st.alert, { [st[color]]: true })}>{children}</div>;
};

export default Alert;
