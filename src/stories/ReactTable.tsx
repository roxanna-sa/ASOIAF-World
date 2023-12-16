import { useTable, useGlobalFilter } from 'react-table';
import { GlobalFilter } from './GlobalFilter';

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
}

/**
 * Primary UI component for user interaction
 */
export const ReactTable = ({data: tableData, columns: columns, globalSearch: globalSearch }: TableProps) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable<any>(
    { columns, data: tableData || [] }, useGlobalFilter);

  const {globalFilter} = state


  return (
    <>
      { globalSearch && <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />}
      <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
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
    </>
  );
};
