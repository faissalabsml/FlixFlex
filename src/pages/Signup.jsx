import React from "react";
import { Link } from "react-router-dom";

import UserForm from "../components/UserForm";

function Signup() {
  return (
    <>
      <h1>
        <Link to="/">FlixFlex.</Link>
      </h1>
      <UserForm text="sign up" type="signup" />
    </>
  );
}

export default Signup;
