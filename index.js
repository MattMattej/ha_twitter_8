const passport = require("passport");
const session = require("./config/sessionConfig");
//Seteamos el middleware session de manera global con propiedades
app.use(session);
//otro middleware, especificamos a passport que vamos a usar session.
app.use(passport.session());
require("./config/passportConfig");
