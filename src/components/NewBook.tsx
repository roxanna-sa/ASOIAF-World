import { useFormik } from "formik";
import { Page } from "../stories/Page";
import { TextInput } from "../stories/TextInput";
import { Button } from "../stories/Button";

const NewBook: React.FC = () => {

    // A custom validation function. This must return an object
    // which keys are symmetrical to our values/initialValues
    const validate = (values: any) => {
      const errors: any = {};
      // Validate title:
      if (!values.title) {
        errors.title = 'Required';
      } else if (values.title.length < 2) {
        errors.title = 'Must be longer than 2 characters';
      }

      /*
      if (!values.lastName) {
        errors.lastName = 'Required';
      } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      */

      return errors;
    };

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      genre: '',
      releaseDate: '',
      synopsis: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <Page>
      <h3>Add new book</h3>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="title">Title</label>
        <TextInput id="title" type="text" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} ></TextInput>
        {formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null}

        <label htmlFor="author">Author</label>
        <TextInput id="author" type="text" onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur} ></TextInput>

        <label htmlFor="genre">Genre</label>
        <TextInput id="genre" type="text" onChange={formik.handleChange} value={formik.values.genre} onBlur={formik.handleBlur} ></TextInput>

        <label htmlFor="releaseDate">Release date</label>
        <TextInput id="releaseDate" type="date" onChange={formik.handleChange} value={formik.values.releaseDate} onBlur={formik.handleBlur} ></TextInput>

        <label htmlFor="synposis">Synposis</label>
        <textarea id="synposis" onChange={formik.handleChange} value={formik.values.synopsis} onBlur={formik.handleBlur} ></textarea>

        <Button label="submit" type="submit"></Button>
      </form>
    </Page>
  );
}

export default NewBook;