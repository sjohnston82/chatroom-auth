import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const history = useHistory();

  async function loginUser(user) {
    await fetch("http://localhost:8000/login/", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then(async (data) => {
        console.log(data);
        await props.setCredentials(user.username, data.token);
        history.push("/");
      });
  }

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await loginUser(user).then(() => {
      history.push("/");
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username..."
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password..."
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
