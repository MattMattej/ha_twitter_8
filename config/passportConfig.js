const { User, Role } = require("../models");
const passport = require("passport");
const LocalStrategy = require("passport-local");
//Especifico la estrategia
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      console.log(email);
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return done(null, false, { message: "datos incorrectos" });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: "datos incorrectos" });
      }
      console.log(user);
      return done(null, user);
    }
  )
);
// para ver que se guarda en la session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// buscar la info de la cookie - serialize
passport.deserializeUser(function (id, done) {
  User.findByPk(id, { include: Role })
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});
