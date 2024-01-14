import React from "react";
import { MagnifyingGlass } from "@vectopus/atlas-icons-react";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    navigate(`/search/${query}`);
  }

  return (
    <form className="navbar_search" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        required
        placeholder="Search movies or TV shows"
        className="navbar_search_input"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
        }}
      />
      <button className="navbar_search_button">
        <MagnifyingGlass size={24} />
      </button>
    </form>
  );
}

export default SearchInput;
