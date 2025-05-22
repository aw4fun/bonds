import Segment from '../../components/Segment';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { useFormik } from 'formik';

const NewIdeaPage = () => {
  // const [state, setState] = useState({
  //   name: '',
  //   nick: '',
  //   description: '',
  //   text: '',
  // });

  const formik = useFormik({
    initialValues: { name: '', nick: '', description: '', text: '' },
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log('onSubmit', values);
    },
  });

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="name" label="Name" formik={formik} />

        <Input name="nick" label="Nick" formik={formik} />

        <Input name="description" label="Description" formik={formik} />

        <TextArea name="text" label="Text" formik={formik} />

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
};

export default NewIdeaPage;
