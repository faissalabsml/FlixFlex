import React from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";

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
