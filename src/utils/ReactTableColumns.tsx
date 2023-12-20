import { useMemo } from "react";
import { Column } from "react-table";
import { Button } from "../stories/Button";


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

export const ColumnDefinition = (getDetailsFunction: any) => {
  
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
        <Button primary={true} label='View details' onClick={ () => getDetailsFunction(row.row.original) }></Button>
      ),
      disableFilters: true,
      disableSortBy: true
    }
  ],
  []);

  return columns
}

