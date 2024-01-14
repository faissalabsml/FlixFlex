import React from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchInput from "./SearchInput";
import { UserAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, firebaseLogout } = UserAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await firebaseLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

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
      </div>

      <div className="navbar_account">
        {user?.email ? (
          <button
            className="navbar_link navbar_account_button"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar_link navbar_account_button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
