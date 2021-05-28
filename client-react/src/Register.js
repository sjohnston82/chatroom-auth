import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const history = useHistory();
  const makeNewUser = (newUser) => {
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(newUser);
    makeNewUser(newUser);
    setNewUser({ username: "", password: "" });
    history.push("/login");
  };

  const handleChange = (evt) => {
    setNewUser({ ...newUser, [evt.target.name]: evt.target.value });
  };
  return (
    <div>
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Pick a username"
          value={newUser.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Enter a password"
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
