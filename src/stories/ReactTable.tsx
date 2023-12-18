import { useTable, useGlobalFilter, useSortBy, usePagination, useFilters} from 'react-table';
import { GlobalFilter } from './GlobalFilter';
import { Button } from './Button';
import { SelectColumnFilter, Filter } from '../utils/ReactTableFilter';

interface TableProps {
  /**
   * Table data
   */
  data?: any;
  /**
   * column definition
   */
  columns?: any;
  /**
   * does the global search appear?
   */
  globalSearch?: boolean;
  /**
   * Flag to show pagination
   */
  showPagination?: boolean;
  /**
   * Flag for when data is being loaded
   */
  isLoading?: boolean;
  /**
   * Handler for when an error when loading data occurs
   */
  error?: any;

}

/**
 * Primary UI component for user interaction
 */
export const ReactTable = ({data: tableData, columns: columns, globalSearch: globalSearch, showPagination: showPagination, isLoading: isLoading, error: error }: TableProps) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // @ts-ignore Typescript and React table bug
    page,
    // @ts-ignore Typescript and React table bug
    nextPage,
    // @ts-ignore Typescript and React table bug
    previousPage,
    prepareRow,
    state,
     // @ts-ignore Typescript and React table bug
    setGlobalFilter,
  } = useTable<any>(
    // @ts-ignore Typescript and React table bug
    { columns, data: tableData || [], defaultColumn: { Filter: SelectColumnFilter } }, useGlobalFilter, useFilters, useSortBy, usePagination );

  // @ts-ignore Typescript and React table bug
  const {globalFilter} = state

  if (error) return <div>An error ocurred: {error.message}</div>;
  if (isLoading) return <div>Loading books...</div>;
  if (tableData.length === 0) return <div>No available data</div>;

  return (
    <>
      { globalSearch && <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />}
      <table className='w-full' {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map((column: any) => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {/* // Render the header */}
                    { column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '🔼': '🔽') : '⏹'}
                    </span>
                  </div>
                  
                  <Filter column={column} />
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          page.map((row: any) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map((cell: any) => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>
                      {// Render the cell contents
                      cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      
        {
          showPagination &&
          <div className='text-center mt-6'>
            <Button size="small" onClick={previousPage} label="Previous" />
            <Button size="small" onClick={nextPage} label="Next" />
          </div>
        }
      
      
    </>
  );
};
