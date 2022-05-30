const mongoose = require("mongoose");

const dbInit = async () => {
	mongoose.connect(process.env.DB_CONNECTION);

	mongoose.connection
		.once("open", () =>
			console.log("¡Conexión con la base de datos establecida!")
		)
		.on("error", (error) => console.log(error));
};

module.exports = dbInit;
