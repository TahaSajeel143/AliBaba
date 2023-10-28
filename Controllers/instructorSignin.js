/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import FacebookSt from 'passport-facebook';


import Model from '../Models/Model';


FacebookStrategy = FacebookSt.Strategy;

const createToken = (user, res, next) => {
    const { id, email, firstName, lastName } = user;
    const payload = {
        _id: id,
        email,
        firstName,
        lastName,

    };
    console.log(payload);
    // create a token
    jwt.sign(
        payload,
        process.env.JwtSecret, {
            expiresIn: '365d',
        },
        (err, token) => {
            // Error Create the Token
            if (err) {
                res.status(500);
                next(new Error('Unable to generate Token.'));
            } else {
                // Token Created
                res.json({
                    token,
                });
            }
        },
    );
};

const userSignIn = (req, res, next) => {
    const { email, password } = req.body;
    // Find user with the passed email
    Model.InstructorModel.findOne({ email }).then(user => {
        if (user) {
            // if email found compare the password
            bcryptjs.compare(password, user.password).then(result => {
                // if password match create payload
                if (result) {
                    createToken(user, res, next);
                } else {
                    res.status(400);
                    next(new Error('Invalid Password'));
                }
            });
        } else {
            // Wrong Password.
            res.status(400);
            next(new Error('No User Exist With This Email'));
        }
    });
};

const facebookSignin = async(req, res) => {

    passport.use(new FacebookStrategy({
        clientID: 'your-client-id',
        clientSecret: 'your-client-secret',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }, function(accessToken, refreshToken, profile, dob, done) {
        // Check if the user is already in the database
        User.findOne({ facebookId: profile.id }, function(err, user) {
            if (err) { return done(err); }
            if (user) { return done(null, user); }

            // If the user is not in the database, create a new user
            const newUser = new User({
                facebookId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                // eslint-disable-next-line no-underscore-dangle
                dob: profile._json.birthday
            });
            const today = new Date();
            const birthDate = new Date(newUser.dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                // eslint-disable-next-line no-plusplus
                age--;
            }
            newUser.age = age;
            newUser.save(function(error) {
                if (error) { return done(error); }
                return done(null, newUser);
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


};
export default { userSignIn, facebookSignin };