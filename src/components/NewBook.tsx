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
        <h3 className="text-2xl font-bold mb-4">Add New Book</h3>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mt-4">
            Title
          </label>
          <TextInput
        
            id="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          ) : null}
  
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mt-4">
            Author
          </label>
          <TextInput
            id="author"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.author}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded-md w-full"
          />
          
  
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mt-4">
            Genre
          </label>
          <TextInput
            id="genre"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.genre}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded-md w-full"
          />
  
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mt-4">
            Release date
          </label>
          <TextInput
            id="releaseDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.releaseDate}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded-md w-full"
          />
  
          <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700 mt-4">
            Synopsis
          </label>
          <textarea
            id="synopsis"
            onChange={formik.handleChange}
            value={formik.values.synopsis}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          ) : null}
          
  
          <Button type="submit" customClassName="bg-orange-700 text-white" size="small" label="Submit" onChange={formik.submitForm}/>
        </form>
      </Page>
    );
  }
  
  export default NewBook;
  