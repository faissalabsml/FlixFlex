import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

function Form({ text, type }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { firebaseLogin, firebaseSignup } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  async function handleSubmit(e) {
    e.preventDefault();

    if (location === "/login") {
      try {
        await firebaseLogin(`${username}@gmail.com`, password);
        navigate("/");
      } catch ({ message }) {
        setErrorMessage(message);
      }
    }

    if (location === "/signup") {
      try {
        await firebaseSignup(`${username}@gmail.com`, password);

        navigate("/");
      } catch ({ message }) {
        setErrorMessage(message);
      }
    }
  }

  return (
    <>
      <div className="form-container">
        <h2>{text}</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input_row">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input_row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button>{text}</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

        <div className="form_footer">
          <p>
            {type === "login" ? "Don't have an account?" : "Already a user?"}
          </p>
          <Link to={`/${type === "login" ? "signup" : "login"}`}>
            {type === "login" ? "sign up" : "log in"}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Form;
