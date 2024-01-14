import React from "react";
import { Link } from "react-router-dom";

function Form({ type }) {
  const redirect = type === "login" ? "signup" : "login";

  return (
    <>
      <div className="form-container">
        <h2>{type}</h2>
        <form className="form">
          <div className="input_row">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              required
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
            />
          </div>

          <button>{type}</button>
        </form>

        <div className="form_footer">
          <p>{redirect === "login" ? "Already a user?" : "No account?"}</p>
          <Link to={`/${redirect}`}>{redirect}</Link>
        </div>
      </div>
    </>
  );
}

export default Form;
