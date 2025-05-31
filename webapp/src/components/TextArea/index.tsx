import { FormikProps } from 'formik';
import cn from 'classnames';
import st from './TextArea.module.less';

const TextArea = ({
  name,
  label,
  formik,
  maxWidth,
}: {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  maxWidth?: number;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const invalid = !!touched && !!error;
  const disabled = formik.isSubmitting;

  return (
    <div className={cn(st.field, { [st.disabled]: disabled })}>
      <label className={st.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        style={{ maxWidth }}
        className={cn(st.input, { [st.invalid]: invalid })}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {invalid && <div className={st.error}>{error}</div>}
    </div>
  );
};

export default TextArea;
