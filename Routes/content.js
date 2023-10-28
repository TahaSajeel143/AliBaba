import express from 'express';
import events from '../Controllers/content';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
// import isLoggedInUser from '../Middlewares/loggedIn';
// // validations
// import eventValidator from '../validations/event';

const contentRouter = express.Router();

contentRouter.post(
    '/add',

    events.addContent,
);

contentRouter.get('/:Sid', events.getContent);

contentRouter.get('/con/:eid', events.getSingleContent);

// only admin can delete
contentRouter.delete(
    '/delete/:id',
    isAdminMiddleware.isManagerOwner,
    events.deleteContent,
);

contentRouter.patch('/edit/:id', events.editContent);

export default contentRouter;