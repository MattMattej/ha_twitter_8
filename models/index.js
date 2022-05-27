//const mongoose = require("mongoose");
//const dbConnect = async () => {
//await mongoose.connect("mongodb://localhost/twitter_8");
// mongoose.connection;
//    .once("open", () => {
//     console.log("[Database] Se ha establecido la conexion a la bd");
//    })
//    .on("error", (error) => {
//     console.log(error);
//    });
//};
//module.exports = dbConnect;

const mongoose = require("mongoose");

const dbInit = () => {
  mongoose.connect("mongodb://localhost/dbmongoose-hack-academy");

  mongoose.connection
    .once("open", () =>
      console.log("¡Conexión con la base de datos establecida!")
    )
    .on("error", (error) => console.log(error));
};

module.exports = dbInit;
