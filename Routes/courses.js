import express from 'express';
import events from '../Controllers/courses';

// auth middlewares for admin
// import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// // validations
// import eventValidator from '../validations/event';

const courseRouter = express.Router();

courseRouter.post(
    '/add',

    events.addCourses,
);

courseRouter.post(
    '/addToWishlist',
    isLoggedInUser.isLoggedIn,
    events.addwishlist,
);

courseRouter.get('/', events.getCourses);

courseRouter.get('/Instructor', isLoggedInUser.isLoggedIn, events.getCoursesInstructor);

courseRouter.get('/:eid', events.getSingleCourse);

// only admin can delete
courseRouter.delete(
    '/delete/:id',

    events.deleteCourse,
);

courseRouter.patch('/edit/:id', events.editCourse);

export default courseRouter;