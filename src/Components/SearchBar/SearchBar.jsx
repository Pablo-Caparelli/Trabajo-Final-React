import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <div className="search-container">
      <input
        id="search"
        className="search-input"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Buscar contacto..."
      />
    </div>
  );
};

export default SearchBar;
