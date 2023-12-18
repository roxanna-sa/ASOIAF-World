import React, { useEffect, useMemo, useState } from 'react';
import { getBooks } from '../api';
import { Column } from 'react-table';
import { ReactTable } from '../stories/ReactTable';
import { Page } from '../stories/Page';

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

  const [tableData, setTableData] = useState([]);
  const [error, setError]         = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initial load of books
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const orderResult = await getBooks();
        setTableData(orderResult);
        setIsLoading(false);
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
      )
    }
  ],
  []);

  return (
    // apply the table props
    <>
        <Page>
            <ReactTable data={tableData} columns={columns} globalSearch={true} error={error} isLoading={isLoading}></ReactTable>
        </Page>
    </>
  )
}


export default BookList;
