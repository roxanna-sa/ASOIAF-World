import { useEffect, useState } from "react";
import { Page } from "../stories/Page";
import { getRequest } from "../api";
import { ReactTable } from "../stories/ReactTable";
import BookDialog from "../stories/BookDialog";
import { ColumnDefinition } from "../utils/ReactTableColumns";

const Favourites: React.FC = () => {

  const [selectedBook, setSelectedBook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [favourites, setFavourites ] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<any[]>([]);

  // Get details from book
  const getDetails = (row: any ) => {
    setSelectedBook(row);
    setModalIsOpen(true);
  }

  // Get column definition
  const columns = ColumnDefinition(getDetails);

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
    <>
      
      <BookDialog isOpen={ modalIsOpen } setIsOpen={ setModalIsOpen } modalTitle='Book details' closeButtonText='Close details' >
      { selectedBook && (
        <>
          <p className="font-extrabold">{ (selectedBook as any).name }</p> 
          <p className="font-semibold">{ (selectedBook as any).authors }</p> 
          <p>{ (selectedBook as any).publisher }</p> 
          <p>{ (selectedBook as any).country }</p> 
          <p>Synopsis: Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, 
             commodi quasi incidunt nobis dolorum debitis voluptatum velit explicabo corporis laboriosam, in eum porro, similique 
             optio sint iusto dicta iste magnam?</p>
          <p>4/5 ⭐</p>
        
        </>
      )}
    </BookDialog>

    <Page>
      <h3 className="text-2xl font-bold mb-4">⭐ Favourites</h3>
      <ReactTable data={books} columns={columns} globalSearch={true} error={error} isLoading={loading}></ReactTable>
    </Page>
    </>
  );
}

export default Favourites;