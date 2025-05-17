import { ReactNode } from 'react';
import st from './Segment.module.less';

const Segment = ({
  title,
  size = 1,
  description,
  children,
}: {
  title: ReactNode;
  size?: number;
  description?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={st.segment}>
      {size === 1 ? (
        <h1 className={st.title}>{title}</h1>
      ) : (
        <h2 className={st.title}>{title}</h2>
      )}
      {description && <p className={st.description}>{description}</p>}
      {children && <div className={st.content}>{children}</div>}
    </div>
  );
};

export default Segment;
