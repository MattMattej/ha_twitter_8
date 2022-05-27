const mongoose = require("mongoose");

const dbInit = () => {
	mongoose.connect("mongodb://localhost/twitter_8");

	mongoose.connection
		.once("open", () =>
			console.log("¡Conexión con la base de datos establecida!")
		)
		.on("error", (error) => console.log(error));
};

module.exports = dbInit;
