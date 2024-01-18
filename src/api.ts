import axios from "axios";

const apiUrl = 'https://www.anapioficeandfire.com/api';

// Se llama y muestra todos los libros
export const getBooks = async () => {
  const response = await axios.get(`${apiUrl}/books`);
  return response.data;
};

// Se llama y hace una petición GET a donde sea que el parámetro URL indique
export const getRequest = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};