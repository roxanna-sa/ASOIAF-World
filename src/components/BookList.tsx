import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getBooks } from '../api';
import { Column } from 'react-table';
import { ReactTable } from '../stories/ReactTable';
import { Page } from '../stories/Page';

const FetchBooks = async () => {
  return await getBooks();
};

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

  const { data: tableData, error, isLoading } : {data: any, error: any, isLoading: boolean} = useQuery("books", FetchBooks);  

  // Column defs.
  const columns: Column<DataDefinition>[] = useMemo(() => [
    {
      Header: "Name",
      accessor: "name"
    },
    // {
    //   Header: "Authors",
    //   accessor: "authors"
    // },
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
