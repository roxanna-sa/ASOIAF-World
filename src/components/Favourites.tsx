import { useEffect, useMemo, useState } from "react";
import { Page } from "../stories/Page";
import { getRequest } from "../api";
import { ReactTable } from "../stories/ReactTable";
import { Column } from "react-table";
import { Button } from "../stories/Button";
import BookDialog from "../stories/BookDialog";

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

  // Column definitons.
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