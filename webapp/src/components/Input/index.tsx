import { FormikProps } from 'formik';

const Input = ({
  name,
  label,
  formik,
}: {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}) => {
  const value = formik.values[name];

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        value={value}
        name={name}
        id={name}
      />
    </div>
  );
};

export default Input;
