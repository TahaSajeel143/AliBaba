import express from 'express';
// import multer from 'multer';
import userSignUp from '../Controllers/instructorSignup';

// const storage = multer.memoryStorage();
// const upload = multer({
// 	storage,
// });
const signUpRouter = express.Router();

signUpRouter.post(
    '/',
    userSignUp,
);


export default signUpRouter;