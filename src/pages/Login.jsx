import React from "react";
import { Link } from "react-router-dom";

import UserForm from "../components/UserForm";
import Navbar from "../components/Navbar";

function LogIn() {
  return (
    <>
      <h1>
        <Link to="/">FlixFlex.</Link>
      </h1>
      <UserForm text="log in" type="login" />
    </>
  );
}

export default LogIn;
