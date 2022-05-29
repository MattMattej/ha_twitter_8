const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const session = require("express-session");
const { findById } = require("../models/User");
module.exports = async (app) => {
	app.use(passport.session());
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			console.log("se le paso el username y la contraseña");
			console.log("username:", username);
			console.log("esta es la que va:", password);
			const user = await User.findOne({ username: username });
			console.log("busco al user");
			console.log("esta es la de user:", user);
			if (!user) {
				console.log("no encontro user");
				return done(null, false, { message: "Usuario no encontrado" });
			}
			// const compare = await bcrypt.compare(password, user.password);
			//lo tuve que hacer manual porque bcrypts todavia no tiene contraseñas hasheadas y no anda!!!
			if (!password === user.password) {
				console.log("busco la contraseña");
				console.log("contraseña incorrecta");
				return done(null, false, { message: "Datos invalidos" });
			}
			console.log("todo correcto");
			return done(null, user, { message: "correcto!" });
		})
	);

	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(async function (id, done) {
		try {
			const user = await User.findById(id);
			done(null, user);
			console.log(user);
		} catch (error) {
			done(error, false);
		}
	});
};
