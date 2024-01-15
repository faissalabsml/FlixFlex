import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import SearchInput from "./SearchInput";
import { UserAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, firebaseLogout } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await firebaseLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar_left">
          <Link to="/" className="navbar_logo">
            FlixFlex.
          </Link>
          <div>
            <Link
              to="/movies"
              className={`navbar_link ${
                location.pathname === "/" || location.pathname === "/movies"
                  ? "active"
                  : ""
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tvshows"
              className={`navbar_link ${
                location.pathname === "/tvshows" ? "active" : ""
              }`}
            >
              TV shows
            </Link>
          </div>
        </div>

        <div className="navbar_right">
          <SearchInput />
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
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
