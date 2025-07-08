import React from "react";
import type { SearchBarProps } from "../types";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search names..."
      value={value} // ✅ Make it controlled
      onChange={handleChange}
    />
  );
};

export default SearchBar;
