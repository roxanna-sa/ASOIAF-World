import React from 'react';
import { useQuery } from 'react-query';
import { getBooks } from '../api';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTable, useSortBy, useGlobalFilter, usePagination, TableInstance } from 'react-table';

const FetchBooks = async () => {
  return await getBooks();
};

const BookList: React.FC = () => {

  const { data: books, error, isLoading } : {data: any, error: any, isLoading: boolean} = useQuery("books", FetchBooks);  
  
  if (isLoading) return <div>Cargando libros...</div>;
  if (error) return <div>Ocurrió un error: {error.message}</div>;

  return (
      <ul>
        {books.map((book: any) => (
          <li key={book.isbn}>{book.name}</li>
        ))}
      </ul>
    );
  };


  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'Title',
  //       accessor: 'title',
  //     },
  //     {
  //       Header: 'Author',
  //       accessor: 'author',
  //     },
  //     {
  //       Header: 'Genre',
  //       accessor: 'genre',
  //     },
  //     {
  //       Header: 'Published Date',
  //       accessor: 'publishedDate',
  //     },
  //     {
  //       Header: 'Actions',
  //       accessor: 'id',
  //       Cell: ({ value }: any) => (
  //         <Link to={`/details/${value}`} className="text-blue-500 hover:underline">
  //           View Details
  //         </Link>
  //       ),
  //     },
  //   ],
  //   []
  // );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  //   state: { globalFilter, pageIndex, pageSize }, 
  //   setGlobalFilter,
  //   gotoPage,
  //   setPageSize,
  // }: TableInstance<any> = useTable({ columns, data: books }, useGlobalFilter, useSortBy, usePagination);

  // return (
  //   <div>
  //     <div className="mb-4 flex justify-between items-center">
  //       <div>
  //         <h2 className="text-2xl font-semibold">Book List</h2>
  //       </div>
  //       <div>
  //         <input
  //           type="text"
  //           value={globalFilter || ''}
  //           onChange={(e) => setGlobalFilter(e.target.value)}
  //           placeholder="Search books..."
  //           className="px-2 py-1 border rounded-md"
  //         />
  //       </div>
  //     </div>
  //     <table {...getTableProps()} className="min-w-full border border-collapse">
  //       <thead>
  //         {headerGroups.map((headerGroup) => (
  //           <tr {...headerGroup.getHeaderGroupProps()}>
  //             {headerGroup.headers.map((column) => (
  //               <th
  //                 {...column.getHeaderProps(column.getSortByToggleProps())}
  //                 className="px-4 py-2 border-b cursor-pointer"
  //               >
  //                 {column.render('Header')}
  //                 <span>{column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}</span>
  //               </th>
  //             ))}
  //           </tr>
  //         ))}
  //       </thead>
  //       <tbody {...getTableBodyProps()} className="divide-y">
  //         {rows.map((row) => {
  //           prepareRow(row);
  //           return (
  //             <tr {...row.getRowProps()} className="hover:bg-gray-100">
  //               {row.cells.map((cell) => (
  //                 <td {...cell.getCellProps()} className="px-4 py-2">
  //                   {cell.render('Cell')}
  //                 </td>
  //               ))}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //     <div className="mt-4 flex justify-between items-center">
  //       <div>
  //         <span>
  //           Page{' '}
  //           <strong>
  //             {pageIndex + 1} of {Math.ceil(books.length / pageSize)}
  //           </strong>{' '}
  //         </span>
  //         <span>
  //           | Go to page:{' '}
  //           <input
  //             type="number"
  //             defaultValue={pageIndex + 1}
  //             onChange={(e) => {
  //               const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
  //               setGlobalFilter('');
  //               pageIndex !== pageNumber && pageIndex <= pageNumber && pageIndex >= 0 && gotoPage(pageNumber);
  //             }}
  //             className="w-16 px-2 py-1 border rounded-md"
  //           />
  //         </span>{' '}
  //         <select
  //           value={pageSize}
  //           onChange={(e) => {
  //             setPageSize(Number(e.target.value));
  //           }}
  //           className="px-2 py-1 border rounded-md"
  //         >
  //           {[10, 25, 50].map((pageSize) => (
  //             <option key={pageSize} value={pageSize}>
  //               Show {pageSize}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //     </div>
  //   </div>
  // );


export default BookList;
