const mongoose = require("mongoose");
const userSeeder = require("../seeders/seederUsuarios");
const User = require("./User");

const dbInit = async () => {
  mongoose.connect("mongodb://localhost/twitter_8");

  mongoose.connection
    .once("open", () =>
      console.log("¡Conexión con la base de datos establecida!")
    )
    .on("error", (error) => console.log(error));
};

module.exports = dbInit;
