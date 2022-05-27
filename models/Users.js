const mongoose = require("mongoose");
const Users = mongoose.Schema;
const UsersSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: Email,
  password: String,
  description: String,
  avatar: String,
  likes: Number,
});
