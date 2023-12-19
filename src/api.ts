import axios from "axios";

const apiUrl = 'https://www.anapioficeandfire.com/api';

export const getBooks = async () => {
  const response = await axios.get(`${apiUrl}/books`);
  return response.data;
};

export const getRequest = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};