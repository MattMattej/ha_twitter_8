const mongoose = require("mongoose");

const dbInit = async () => {
<<<<<<< Updated upstream
	mongoose.connect(process.env.DB_CONNECTION);
=======
	mongoose.connect("mongodb://127.0.0.1/prueba_8");
>>>>>>> Stashed changes

	mongoose.connection
		.once("open", () =>
			console.log("¡Conexión con la base de datos establecida!")
		)
		.on("error", (error) => console.log(error));
};

module.exports = dbInit;
