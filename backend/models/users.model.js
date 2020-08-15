const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    proficiency: String,
    salt: String
  },
  { collection: "userInfo" }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
