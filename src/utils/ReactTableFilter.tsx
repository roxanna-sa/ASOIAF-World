import { useMemo } from "react"

export const Filter = ({ column }: { column: any }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  )
}

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}: { column: any }) => {
  return (
    <input type='text' value={filterValue || ""} onChange={e => { setFilter(e.target.value || undefined) }} placeholder={`search (${length}) ...`} ></input>
  )
}

export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }: {column: any}) => {
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <select id="custom-select" value={filterValue} onChange={e => { setFilter(e.target.value || undefined) }}>
      <option value="">All</option>
      {options.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}