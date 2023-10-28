/* eslint-disable no-underscore-dangle */
import status from 'http-status';
import Pusher from 'pusher';
import LiveInstructorRequest from '../Models/instructorRequest';
import Course from '../Models/courseSchema';
import User from '../Models/instructorSchema';

// const getEvents = (req, res) => {
//     EventSchema.find()
//         .then(events => {
//             res.status(status.OK).send(events);
//         })
//         .catch(err => {
//             res.status(status.INTERNAL_SERVER_ERROR).send({
//                 Message: 'No Events!',
//                 err,
//             });
//         });
// };

const addEvent = async(req, res) => {
    const { courseId } = req.body;
    console.log(req.user._id);
    // Create a new live instructor request
    const request = new LiveInstructorRequest({
        studentId: req.user._id,
        course: courseId,
    });

    // Save the request to the database
    await request.save();

    // Get the course instructor's ID
    const course = await Course.findById({ _id: courseId });
    // eslint-disable-next-line prefer-destructuring
    const instructorId = course.instructorId;

    // Get the instructor's device token from the User model
    const instructor = await User.findById({ _id: instructorId });
    // eslint-disable-next-line prefer-destructuring
    const deviceToken = instructor.deviceToken;

    // Send a push notification to the instructor using Pusher
    const pusher = new Pusher({
        appId: process.env.app_id,
        key: process.env.key,
        secret: process.env.secret,
        cluster: process.env.cluster,
        useTLS: true,
    });

    pusher.trigger(deviceToken, 'live-instructor-request', {
        message: 'A new live instructor request has been submitted for your course',
    })

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

// const deleteEvent = (req, res) => {
//     const { id } = req.params;
//     EventSchema.findByIdAndRemove(id, (err, result) => {
//         if (result) {
//             res.status(status.OK).send({
//                 Message: 'Event Deleted Successfully.',
//             });
//         } else {
//             res.status(status.INTERNAL_SERVER_ERROR).send({
//                 Message: 'Unable to Delete.',
//                 err,
//             });
//         }
//     });
// };

// const editEvent = (req, res) => {
//     const { id } = req.params;
//     const query = { $set: req.body };
//     EventSchema.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
//         if (err) {
//             res.status(status.INTERNAL_SERVER_ERROR).send({
//                 Message: 'Unable to Update.',
//             });
//         } else {
//             res.status(status.OK).send({
//                 Message: 'Successfully Updated.',
//                 result,
//             });
//         }
//     });
// };

// const getSingleEvent = (req, res) => {
//     const { eid } = req.params;

//     EventSchema.findOne({ _id: eid })
//         .then(event => {
//             if (!event) {
//                 return res.status(status.NOT_FOUND).send({
//                     Message: 'Boat not found',
//                 });
//             }
//             return res.status(status.OK).send(event);
//         })
//         .catch(err => {
//             return res.status(status.INTERNAL_SERVER_ERROR).send({
//                 Message: 'Internal Server Error',
//                 err,
//             });
//         });
// };

export default { addEvent };