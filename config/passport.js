const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const session = require("express-session");
module.exports = async (app) => {
	app.use(passport.session());
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			const user = await User.findOne({ username: username });

			if (!user) {
				return done(null, false, { message: "Usuario no encontrado" });
			}

			if (!(await user.comparePass(password))) {
				return done(null, false, { message: "Datos invalidos" });
			}

			return done(null, user, { message: "correcto!" });
		})
	);

	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(async function (id, done) {
		// BUSCO EN LA BASE DATOS LO QUE ME PASAN POR LOGIN Y LO GUARDO
		// EN REQ.USER(ESTO QUEDA GUARDADO PARA TODAS LAS RUTAS)

		try {
			const user = await User.findById(id);
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	});
};
// REQ.USER LO CREA PASSPORT MIENTRAS EL USUARIO ESTE LOGUEADO, ADENTRO VIAJAN TODOS LOS DATOS DE ESE USUARIO
