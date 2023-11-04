import express from 'express';
import AliBaba from '../Controllers/AliBaba';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
// import isLoggedInUser from '../Middlewares/loggedIn';
// // validations
// import eventValidator from '../validations/event';

const AliBabaRouter = express.Router();


AliBabaRouter.post(
    '/add',
    isAdminMiddleware.isManagerOwner,
    AliBaba.addproduct
);



AliBabaRouter.post(
    '/category',
    isAdminMiddleware.isManagerOwner,
    AliBaba.addcategory
);


AliBabaRouter.get(
    '/getall',
    isAdminMiddleware.isManagerOwner,
    AliBaba.getAllProducts
);


AliBabaRouter.get(
    '/getone/:id',
    isAdminMiddleware.isManagerOwner,
    AliBaba.getOneProduct
);


AliBabaRouter.get(
    '/usergetone/:id',
    AliBaba.getOneProduct
);



AliBabaRouter.get(
    '/usergetall',
    AliBaba.getAllProducts
);












export default AliBabaRouter;