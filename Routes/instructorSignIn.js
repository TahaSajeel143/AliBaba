import express from 'express';
import userSignIn from '../Controllers/instructorSignin';
import request from '../Controllers/enrollment';
import userValidator from '../validations/user';

const signInRouter = express.Router();

signInRouter.post('/', userValidator.userSignin, userSignIn);
signInRouter.post('/request-live', request.postNotification);


// signInRouter.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

export default signInRouter;