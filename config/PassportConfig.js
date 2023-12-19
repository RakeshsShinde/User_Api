import passport from 'passport';
import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import userModel from '../models/User.model.js';


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwtsecretkey',
};


passport.use(
    new Strategy(jwtOptions, async (payload, done) => {
        console.log(payload);
        try {
            const user = await userModel.findById(payload.id);
            console.log(user);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);


export default passport;




