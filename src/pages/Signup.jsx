import React from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import Navbar from "../components/Navbar";

function Signup() {
  return (
    <>
      <h1>
        <Link to="/">FlixFlex.</Link>
      </h1>
      <Form text="sign up" type="signup" />
    </>
  );
}

export default Signup;
