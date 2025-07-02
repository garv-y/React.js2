import React from "react";
import type { SearchBarProps } from "../types";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search names..."
      onChange={(e) => onSearch(e.target.value)}
      className="form-control mb-3"
    />
  );
};

export default SearchBar;
