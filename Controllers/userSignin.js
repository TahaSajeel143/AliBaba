/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import status from 'http-status';
// import passport from 'passport';
// import FacebookSt from 'passport-facebook';


import Model from '../Models/Model';


// FacebookStrategy = FacebookSt.Strategy;

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

    // Step 1: Log that the function has started
    console.log('Step 1: Function started');

    // Find user with the passed email
    Model.UserModel.findOne({ email }).then(user => {
        // Step 2: Log that the user has been found or not
        console.log('Step 2: User found:', user);

        if (user) {
            // if email found compare the password
            bcryptjs.compare(password, user.password).then(result => {
                // Step 3: Log the result of password comparison
                console.log('Step 3: Password comparison result:', result);

                // if password match create payload
                if (result) {
                    // Step 4: Log that the password is valid
                    console.log('Step 4: Password is valid. Creating token.');
                    createToken(user, res, next);
                } else {
                    // Step 5: Log that the password is invalid
                    console.log('Step 5: Password is invalid. Sending 400 response.');
                    res.status(400);
                    next(new Error('Invalid Password'));
                }
            });
        } else {
            // Step 6: Log that no user was found with the provided email
            console.log('Step 6: No user found with the provided email. Sending 400 response.');
            
            // Wrong Password.
            res.status(400);
            next(new Error('No User Exist With This Email'));
        }
    });
};



const getAlluser = (req, res) => {
    Model.UserModel.find()
        .then(events => {
            res.status(status.OK).send(events);
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'No Events!',
                err,
            });
        });
};

const getAllNotificationsInstructor = (req, res) => {

    // eslint-disable-next-line no-underscore-dangle

    // eslint-disable-next-line no-underscore-dangle
    NotifySchema.find({ teacherId: req.user._id }).sort({ 'createdAt': -1 }).limit(10)
        .then(events => {
            res.status(status.OK).send(events);
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'No shipments!',
                err,
            });
        });
};

// const facebookSignin = async(req, res) => {

//     passport.use(new FacebookStrategy({
//         clientID: 'your-client-id',
//         clientSecret: 'your-client-secret',
//         callbackURL: 'http://localhost:3000/auth/facebook/callback'
//     }, function(accessToken, refreshToken, profile, dob, done) {
//         // Check if the user is already in the database
//         User.findOne({ facebookId: profile.id }, function(err, user) {
//             if (err) { return done(err); }
//             if (user) { return done(null, user); }

//             // If the user is not in the database, create a new user
//             const newUser = new User({
//                 facebookId: profile.id,
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 // eslint-disable-next-line no-underscore-dangle
//                 dob: profile._json.birthday
//             });
//             const today = new Date();
//             const birthDate = new Date(newUser.dob);
//             let age = today.getFullYear() - birthDate.getFullYear();
//             const month = today.getMonth() - birthDate.getMonth();
//             if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//                 // eslint-disable-next-line no-plusplus
//                 age--;
//             }
//             newUser.age = age;
//             newUser.save(function(error) {
//                 if (error) { return done(error); }
//                 return done(null, newUser);
//             });
//         });
//     }));

//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });

//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });


// };
export default { userSignIn, getAlluser };