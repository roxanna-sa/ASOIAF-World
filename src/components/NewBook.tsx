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

      if (!values.author) {
        errors.author = 'Required';
      } else if (values.author.length < 2) {
        errors.author = 'Must be longer than 2 characters';
      }

      if (!values.genre) {
        errors.genre = 'Required';
      } else if (values.genre.length < 2) {
        errors.genre = 'Must be longer than 2 characters';
      }

      if (!values.releaseDate) {
        errors.releaseDate = 'Required';
      }

      if (!values.synopsis) {
        errors.synopsis = 'Required';
      } else if (values.synopsis.length < 15) {
        errors.synopsis = 'Must be longer than 15 characters';
      }

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
      onSubmit: () => {
        alert("Book was added 😇");
      },
    });
  
    return (
      <Page>
        <h3 className="text-2xl font-bold mb-4">Add New Book</h3>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mt-4 dark:text-gray-200">
            Title 

            {formik.touched.title && formik.errors.title ? (
              <p className="text-red-500 text-sm inline-block pl-2 h-auto my-0i">* {formik.errors.title}</p>
            ) : null}
          </label>
          <TextInput
        
            id="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
          />
  
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mt-4 dark:text-gray-200">
            Author

            {formik.touched.author && formik.errors.author ? (
              <p className="text-red-500 text-sm inline-block pl-2 h-auto my-0i">* {formik.errors.author}</p>
            ) : null}
          </label>
          <TextInput
            id="author"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.author}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.author && formik.errors.author ? 'border-red-500' : ''}`}
          />
          
  
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mt-4 dark:text-gray-200">
            Genre
            {formik.touched.genre && formik.errors.genre ? (
              <p className="text-red-500 text-sm inline-block pl-2 h-auto my-0i">* {formik.errors.genre}</p>
            ) : null}
          </label>
          <TextInput
            id="genre"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.genre}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.genre && formik.errors.genre ? 'border-red-500' : ''}`}
          />
  
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mt-4 dark:text-gray-200">
            Release date
            {formik.touched.releaseDate && formik.errors.releaseDate ? (
              <p className="text-red-500 text-sm inline-block pl-2 h-auto my-0i">* {formik.errors.releaseDate}</p>
            ) : null}
          </label>
          <TextInput
            id="releaseDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.releaseDate}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full ${formik.touched.releaseDate && formik.errors.releaseDate ? 'border-red-500' : ''}`}
          />
  
          <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700 mt-4 dark:text-gray-200">
            Synopsis
            {formik.touched.synopsis && formik.errors.synopsis ? (
              <p className="text-red-500 text-sm inline-block pl-2 h-auto my-0">* {formik.errors.synopsis}</p>
            ) : null}
          </label>
          <textarea
            id="synopsis"
            onChange={formik.handleChange}
            value={formik.values.synopsis}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full dark:text-black ${formik.touched.synopsis && formik.errors.synopsis ? 'border-red-500' : ''}`}
          />
          
  
          <Button type="submit" customClassName="bg-orange-700 text-white" size="small" label="Submit" onChange={formik.submitForm}/>
        </form>
      </Page>
    );
  }
  
  export default NewBook;
  