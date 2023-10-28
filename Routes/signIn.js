import express from 'express';
import userSign from '../Controllers/userSignin';
import request from '../Controllers/enrollment';
import adminSignIn from '../Controllers/adminSignin';
import middleware from '../Middlewares/loggedIn';
import userValidator from '../validations/user';

const signInRouter = express.Router();

signInRouter.post('/', userValidator.userSignin, userSign.userSignIn);

signInRouter.post('/request-live', request.postNotification);

signInRouter.post('/admin', adminSignIn);

signInRouter.get('/getAllUsers', userSign.getAlluser);

signInRouter.get('/getAllnotifications', request.getAllNotifications);

signInRouter.get('/getNotificationsTeacher', middleware.isLoggedIn, request.getAllNotifications);

// signInRouter.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

signInRouter.patch('/acceptRequest/:id', middleware.isLoggedIn, request.RequestAccept);

export default signInRouter;