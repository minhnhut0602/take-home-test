const passport = require("passport");
const User = require("../models/user");
const passportJWT = require("passport-jwt");
const config = require("./config.js");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
};

module.exports = function() {
    const strategy = new JwtStrategy(params,
        async function (req, jwtPayload, done) {
            return User.findOne({ where: { id: jwtPayload.id } })
                .then(async (user) => {
                    if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                })
                .catch((err) => {
                    return done(err);
                });
        }
    );

    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        session: function () {
          return passport.session();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};