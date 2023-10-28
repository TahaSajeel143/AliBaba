import express from 'express';

import userSignUp from '../Controllers/userSignup';
// import userValidator from '../validations/user';

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