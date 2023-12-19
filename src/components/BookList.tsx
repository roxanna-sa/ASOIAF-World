import React, { useEffect, useMemo, useState } from 'react';
import { getBooks } from '../api';
import { Column } from 'react-table';
import { ReactTable } from '../stories/ReactTable';
import { Page } from '../stories/Page';
import BookDialog from '../stories/BookDialog';
import { Button } from '../stories/Button';

interface DataDefinition {
  "url": string;
  "name": string;
  "isbn": string;
  "authors": string[];
  "numberOfPages": number;
  "publisher": string;
  "country": string;
  "mediaType": string;
  "released": Date;
  "characters": string[],
  "povCharacters": string[];
}



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
      console.log("baking up: fav modified");
      console.log("is loading?", loading);
      if (loading){
        return;
      }
      // Backup favourites in session
      localStorage.setItem('favourites', JSON.stringify(favourites));
      console.log("fav saved?");
    }

    backupFavourites();
  }, [favourites]);

  const addToFavourites = (book: any) => {
    // check if book is null
    if (book == null){
      return;
    }

    console.log("favourites", favourites);

    // Check if book already exists
    if (favourites.some(x => x === book.url)) {
      alert('This book is already in your favourites 😃');
    } else {
      setFavourites([...favourites, book.url]);
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
    console.log("get details");
    console.log(row);
    setSelectedBook(row);
    setModalIsOpen(true);
  }
  
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

  // Column defs.
  const columns: Column<DataDefinition>[] = useMemo(() => [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Authors",
      accessor: "authors"
    },
    {
      Header: "isbn",
      accessor: "isbn"
    },
    {
      Header: "Number of pages",
      accessor: "numberOfPages",
      Cell: (row: any) => (
        <div className='text-center'>{row.value}</div>
      )
    },
    {
      Header: "Publisher",
      accessor: "publisher"
    },
    {
      Header: "Country",
      accessor: "country"
    },
    {
      Header: "Media Type",
      accessor: "mediaType"
    },
    {
      Header: "Released",
      accessor: d => {
        return new Date(d.released).toLocaleDateString('en-US')
      },
      Cell: (row: any) => (
        <div className='text-right'>{row.value}</div>
      ),
      sortType: (a: any, b: any) => {
        return new Date(b.values.Released).valueOf() - new Date(a.values.Released).valueOf();
      }
    },
    {
      Header: "Details",
      accessor: d => {
        return d.isbn;
      },
      Cell: (row: any) => (
        <Button primary={true} label='View details' onClick={ () => getDetails(row.row.original) }></Button>
      ),
      disableFilters: true,
      disableSortBy: true
    }
  ],
  []);

  return (
    // apply the table props
    <>
        <BookDialog isOpen={ modalIsOpen } setIsOpen={ setModalIsOpen } modalTitle='Book details' closeButtonText='Close details' addToFavourites={ () => addToFavourites(selectedBook) }>
          { selectedBook && (
            <>
              <p>{ (selectedBook as any).name }</p> 
              <p>{ (selectedBook as any).authors }</p> 
              <p>{ (selectedBook as any).publisher }</p> 
              <p>{ (selectedBook as any).country }</p> 
            </>
          )}
        </BookDialog>

        <Page>
            <ReactTable data={tableData} columns={columns} globalSearch={true} error={error} isLoading={isLoading}></ReactTable>
        </Page>
    </>
  )
}


export default BookList;
