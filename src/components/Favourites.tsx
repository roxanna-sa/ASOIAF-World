import { useEffect, useState } from "react";
import { Page } from "../stories/Page";
import { getRequest } from "../api";

const Favourites: React.FC = () => {

  const [favourites, setFavourites ] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const loadFavouritesFromLocalStorage = () => {
      try{
        const fav = localStorage.getItem('favourites');
        if (fav == null) {
          setLoading(false);
          return;
        }
  
        setFavourites(JSON.parse(fav));
      }catch(error: any){
        setError(error);
      }
    }

    loadFavouritesFromLocalStorage();
  }, []);

  useEffect(() => {
    const loadAllFavouriteBooks = async () => {
      try{
        const requests: any = [];
        favourites.forEach(x => {
          requests.push(getRequest(x))
        });

        const results = await Promise.allSettled(requests);

        setBooks(results.map((x: any) => x.value));
      }catch(error: any){
        setError(error);
      }
    }

    loadAllFavouriteBooks();
  }, [favourites]);

  useEffect(() => {
    const endLoading = async () => {
      try{
        setLoading(false);
      }catch(error: any){
        setError(error);
      }
    }

    endLoading();
  }, [books]);

  if (error) return (
    <Page>
      There was an error loading your favourites 😢
    </Page>
  );

  if (loading) return (
    <Page>
      Loading...
    </Page>
  );

  return (
    <Page>
      {/* <ul> */}
        { books && books.map((book: any) => {
          return (<p>{book.name}</p>)  
        }) }
      {/* </ul> */}
    </Page>
  );
}

export default Favourites;