import React from "react";
import { TextInput } from "./TextInput";

interface GlobalFilterProps {
  filter: string | undefined;
  setFilter: (value: string) => void;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({ filter, setFilter }) => {
  return (
    <span className="flex items-center space-x-2"> 
      <label htmlFor="search" className="font-bold">Search:</label>
      <TextInput 
        id="search"
        value={filter || ''}
        onChange={(e: any) => setFilter(e.target.value)}
        placeHolder="Type your search..."
        autoComplete="off" />
    </span>
  );
};