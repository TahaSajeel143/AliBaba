import express from 'express';
import AliBaba from '../Controllers/AliBaba';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
 import isLoggedInUser from '../Middlewares/loggedIn';
// // validations

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


AliBabaRouter.get(
    '/allcategories',
    isAdminMiddleware.isManagerOwner,
    AliBaba.getAllCategories
);



AliBabaRouter.get(
    '/usergetallcategories',
    AliBaba.getAllCategories
);



AliBabaRouter.get(
    '/getonecategory/:id',
    isAdminMiddleware.isManagerOwner,
    AliBaba.getOnecategory
);




AliBabaRouter.get(
    '/usergetonecategory/:id',
    AliBaba.getOnecategory
);



AliBabaRouter.post(
    '/addtocart',
    AliBaba.AddToCart
);



AliBabaRouter.post(
    '/notification',
    AliBaba.Notification
);



AliBabaRouter.get(
    '/getcarts',
    AliBaba.getAllCarts
);





AliBabaRouter.patch(
    '/patch/:productId',
    isAdminMiddleware.isManagerOwner,
    AliBaba.patchproducts
);









AliBabaRouter.delete(
    '/delete/:cartItemId',
    AliBaba.DeleteCartItem
);


AliBabaRouter.delete(
    '/deleteproduct/:productId',
    isAdminMiddleware.isManagerOwner,
    AliBaba.DeleteProduct
);





AliBabaRouter.patch(
    '/patchcart/:cartItemId',
    AliBaba.patchCart
);



AliBabaRouter.post(
    '/feedback',
    AliBaba.addfeedback
);





AliBabaRouter.post(
    '/addseller',
    AliBaba.postSeller
);







export default AliBabaRouter;