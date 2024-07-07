const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
    try{
        return done(null, payload);
    }
    catch(error){
        done(error, false);
    }
});

module.exports = jwtStrategy;