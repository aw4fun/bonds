import cn from 'classnames';
import { ReactNode } from 'react';

import st from './Alert.module.less';

const Alert = ({
  color,
  children,
}: {
  color: 'red' | 'green';
  children: ReactNode;
}) => {
  return <div className={cn(st.alert, { [st[color]]: true })}>{children}</div>;
};

export default Alert;
