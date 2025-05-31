import { FormikProps } from 'formik';
import st from './Input.module.less';
import cn from 'classnames';

const Input = ({
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

  const disabled = formik.isSubmitting;
  const invalid = !!touched && !!error;

  return (
    <div className={cn(st.field, { [st.disabled]: disabled })}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        style={{ maxWidth }}
        className={cn(st.input, { [st.invalid]: invalid })}
        type="text"
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

export default Input;
