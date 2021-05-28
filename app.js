const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { Server } = require("socket.io");
const jwtAuth = require("socketio-jwt-auth");
const io = require("socket.io")();
const fs = require("fs");
const User = require("../models/User");
const Message = require("../models/Message");
const port = 8000;

const app = express();

app.use(express.static("static"));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const SECRET = "shhhhhhhsecret";

const publicRoutes = require("./routes/public");
app.use("/", publicRoutes);

// const protectedRoutes = require("./routes/protected");
// app.use("/", protectedRoutes);

module.exports = function () {
  // const server = require("http").createServer(app);
  // const io = new Server(server);

  // io.use(
  //   jwtAuth.authenticate(
  //     {
  //       secret: SECRET, // required, used to verify the token's signature
  //       algorithm: "HS256", // optional, default to be HS256
  //     },
  //     function (payload, done) {
  //       // done is a callback, you can use it as follows
  //       User.findOne({ id: payload.sub }, function (err, user) {
  //         if (err) {
  //           // return error
  //           return done(err);
  //         }
  //         if (!user) {
  //           // return fail with an error message
  //           return done(null, false, "user does not exist");
  //         }
  //         // return success with a user info
  //         return done(null, user);
  //       });
  //     }
  //   )
  // );

  // io.on("connection", function (socket) {
  //   console.log("Authentication passed!");
  //   // now you can access user info through socket.request.user
  //   // socket.request.user.logged_in will be set to true if the user was authenticated
  //   socket.emit("success", {
  //     message: "success logged in!",
  //     user: socket.request.user,
  //   });
  // });

  // io.listen(8000);

  const server = require("http").createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      const data = JSON.stringify(msg);

      io.emit("chat message", msg);

      fs.appendFile(deps.messagesPath, "\n" + data, (err) => {
        if (err) {
          console.log("failed to write to file");
        }
      });
    });
  });
  return server;
};

const connectDatabase = async (hostname, databaseName) => {
  const database = await mongoose.connect(
    `mongodb://${hostname}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

  console.log(`database connected at mongodb://${hostname}/${databaseName}`);

  return database;
};
app.listen(port, async () => {
  await connectDatabase("localhost", "chatroom");
  console.log("listening on port " + port);
});
