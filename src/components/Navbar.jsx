import React from "react";

import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar_links">
        <Link to="/" className="navbar_logo">
          FlixFlex.
        </Link>
        <div>
          <Link to="/movies" className="navbar_link">
            Movies
          </Link>
          <Link to="/tvshows" className="navbar_link">
            TV shows
          </Link>
        </div>
      </div>

      <div className="navbar_search">
        <SearchInput />
        {/* <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="navbar_search_input"
        />
        <button className="navbar_search_button">
          <MagnifyingGlass size={24} />
        </button> */}
      </div>

      <div className="navbar_account">
        <Link to="/login" className="navbar_link navbar_account_button">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
