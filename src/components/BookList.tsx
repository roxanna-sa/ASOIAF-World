import React, { useEffect, useState } from 'react';
import { getBooks } from '../api';
import { ReactTable } from '../stories/ReactTable';
import { Page } from '../stories/Page';
import BookDialog from '../stories/BookDialog';
import { ColumnDefinition } from '../utils/ReactTableColumns';





const BookList: React.FC = () => {
  //#region Favourites
  const [favourites, setFavourites ] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavouritesFromLocalStorage = () => {
      const fav = localStorage.getItem('favourites');
      if (fav == null) {
        setLoading(false);
        return;
      }

      setFavourites(JSON.parse(fav));
      setLoading(false);
    }

    loadFavouritesFromLocalStorage();
  }, []);

  useEffect(() => {
    const backupFavourites = () => {
      if (loading){
        return;
      }
      // Backup favourites in session
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    backupFavourites();
  }, [favourites]);

  const addToFavourites = (book: any) => {
    // check if book is null
    if (book == null){
      return;
    }

    // Check if book already exists
    if (favourites.some(x => x === book.url)) {
      alert('This book is already in your favourites 😃');
    } else {
      setFavourites([...favourites, book.url]);
      alert('Book added to your favourites 📚!');
    }
  }

  //#endregion

  const [tableData, setTableData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Manage modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Get details from book
  const getDetails = (row: any ) => {
    setSelectedBook(row);
    setModalIsOpen(true);
  }
  // Get column definition
  const columns = ColumnDefinition(getDetails);
  
  // Initial load of books
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const orderResult = await getBooks();
        setIsLoading(false);
        setTableData(orderResult);
      } catch (error: any) {
        setError(error);
      }
    }

    loadBooks();
  }, []);


  return (
    <>
      
      <BookDialog isOpen={ modalIsOpen } setIsOpen={ setModalIsOpen } modalTitle='Book details' closeButtonText='Close details' addToFavourites={ () => addToFavourites(selectedBook) }>
        { selectedBook && (
          <>
            <p className="font-extrabold">{ (selectedBook as any).name }</p> 
            <p className="font-semibold">{ (selectedBook as any).authors }</p> 
            <p>{ (selectedBook as any).publisher }</p> 
            <p>{ (selectedBook as any).country }</p> 
            <p>Synopsis: Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, 
             commodi quasi incidunt nobis dolorum debitis voluptatum velit explicabo corporis laboriosam, in eum porro, similique 
             optio sint iusto dicta iste magnam?
            </p>
            <p>4/5 ⭐</p>
          </>
        )}
      </BookDialog>

      <Page>
        <h3 className="text-2xl font-bold mb-4">Book list</h3>
        <ReactTable data={tableData} columns={columns} globalSearch={true} error={error} isLoading={isLoading}></ReactTable>
      </Page>
    </>
  )
}


export default BookList;
