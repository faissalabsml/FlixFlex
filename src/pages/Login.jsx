import React from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import Navbar from "../components/Navbar";

function LogIn() {
  return (
    <>
      <h1>
        <Link to="/">FlixFlex.</Link>
      </h1>
      <Form text="log in" type="login" />
    </>
  );
}

export default LogIn;
