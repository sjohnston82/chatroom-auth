const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (username, plainTextPassword) {
  const user = new this();
  user.username = username;
  await user.hashPassword(plainTextPassword);
  await user.save();
  return user;
};

userSchema.methods.sanitize = function () {
  return {
    ...this._doc,
    password: undefined,
  };
};

userSchema.methods.hashPassword = function (plainTextPassword) {
  const user = this;
  return bcrypt.hash(plainTextPassword, 4).then((hash) => {
    user.password = hash;
  });
};

userSchema.methods.comparePassword = function (plainTextPassword) {
  const user = this;
  return bcrypt.compare(plainTextPassword, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
