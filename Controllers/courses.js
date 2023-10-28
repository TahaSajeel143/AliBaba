/* eslint-disable no-underscore-dangle */
import status from 'http-status';
import EventSchema from '../Models/courseSchema';
import WishlistModel from '../Models/wishlistSchema';

const getCourses = (req, res) => {
    EventSchema.find()
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


const getCoursesInstructor = (req, res) => {

    EventSchema.find({ instructorId: req.user._id })
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


const addCourses = (req, res) => {
    const { courseName, maxCapacity, instructorId } = req.body;

    const event = new EventSchema({

        courseName,
        maxCapacity,
        // eslint-disable-next-line no-underscore-dangle
        instructorId

    });
    event
        .save()
        .then(savedEvent => {
            res.status(status.OK).send({
                savedEvent,
                Message: 'Event Created Successfully',
                type: status.Ok,
            });
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: status.INTERNAL_SERVER_ERROR,
                err,
            });
        });
};

const deleteCourse = (req, res) => {
    const { id } = req.params;
    EventSchema.findByIdAndRemove(id, (err, result) => {
        if (result) {
            res.status(status.OK).send({
                Message: 'Event Deleted Successfully.',
            });
        } else {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'Unable to Delete.',
                err,
            });
        }
    });
};

const editCourse = (req, res) => {
    const { id } = req.params;
    const query = { $set: req.body };
    EventSchema.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
        if (err) {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'Unable to Update.',
            });
        } else {
            res.status(status.OK).send({
                Message: 'Successfully Updated.',
                result,
            });
        }
    });
};
const addwishlist = async(req, res) => {
    try {


        const {
            item
        } = req.body;



        const newOrder = WishlistModel({
            item,
            // eslint-disable-next-line no-underscore-dangle
            userId: req.user._id
        });

        newOrder
            .save()


        .then(async(ships) => {

            res.json({ Message: 'Wishlist Added Successfully.', wishlist: ships });
        }).catch((err) => {
            res.json({ err, Message: 'Unable To add Wishlist' });
        });


    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            Message: 'Can not get into add product',
            error,
        });
    }
};
const getSingleCourse = (req, res) => {
    const { eid } = req.params;

    EventSchema.findOne({ _id: eid }).populate('contentId', ' lessonName lessonContent').exec()
        .then(event => {
            if (!event) {
                return res.status(status.NOT_FOUND).send({
                    Message: 'Boat not found',
                });
            }
            return res.status(status.OK).send(event);
        })
        .catch(err => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'Internal Server Error',
                err,
            });
        });
};

export default { addCourses, getCourses, addwishlist, getSingleCourse, editCourse, deleteCourse, getCoursesInstructor };