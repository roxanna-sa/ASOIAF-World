import { useMemo, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';


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
    <input type='text' value={filterValue || ""} onChange={e => { setFilter(e.target.value || undefined) }} placeholder={`search (${length}) ...`} className="dark:text-black" ></input>
  )
}


export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}: { column: any }) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const [selected, setSelected] = useState(filterValue || 'All');

  return (
    <Listbox value={selected} onChange={(value) => {
      setFilter(value === 'All' ? undefined : value);
      setSelected(value);
    }}>
      <div className="relative mt-1">
        {/* Select box render: */}
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:text-black">
          <span className="block truncate">{selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {/* "All" option */}
            <Listbox.Option key="All" value="All" className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`
              }
            >
              <span
                className={`block truncate ${
                  'All' === selected ? 'font-medium' : 'font-normal'
                }`}
              >
                All
              </span>
              {'All' === selected ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : null}
            </Listbox.Option>
            {options.map((option: any) => (
              // Every option:
              <Listbox.Option
                key={option} value={option} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`} >
                <span className={`block truncate ${
                    option === selected ? 'font-medium' : 'font-normal'
                  }`}>
                  {option}
                </span>
                {option === selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};


