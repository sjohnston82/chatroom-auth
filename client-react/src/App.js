import "./App.css";
import React from "react";
import Rooms from "./Rooms";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Chatroom from "./Chatroom";

import { io } from "socket.io-client";
import Register from "./Register";
const socket = io();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      nick: "",
      token: "",
    };
    this.setCredentials = this.setCredentials.bind(this);
  }

  componentDidMount() {
    socket.on("chat message", (msg) => {
      console.log(this.state.messages);
      this.setState({ messages: this.state.messages.concat(msg) });
      console.log("got a message");
      console.log(msg);
    });

    fetch("/messages")
      .then((res) => res.json())
      .then((newMessages) => {
        this.setState({ messages: newMessages });
      });
  }

  handleSubmitMessage(text, room) {
    const message = { nick: this.state.nick, room, text };
    console.log(message);
    socket.emit("chat message", message);
  }

  // handleLogin(username) {
  //   this.setState({ nick: username });
  // }

  setCredentials(username, token) {
    this.setState({ nick: username, token: token });
  }

  render() {
    return (
      <div className="App">
        <Link to="/login">Log In</Link> or <Link to="/register">Register</Link>
        <Switch>
          <Route path="/login">
            <Login setCredentials={this.setCredentials} />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/rooms/:roomname">
            <Chatroom
              onSubmitMessage={this.handleSubmitMessage.bind(this)}
              messages={this.state.messages}
            />
          </Route>

          <Route exact path="/">
            <h1>Chatroom phase 5</h1>
            <Rooms messages={this.state.messages} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
