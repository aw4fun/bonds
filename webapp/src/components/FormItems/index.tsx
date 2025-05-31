import { ReactNode } from 'react';
import st from './FormItems.module.less';

const FormItems = ({ children }: { children: ReactNode }) => {
  return <div className={st.formItems}>{children}</div>;
};

export default FormItems;
