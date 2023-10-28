/* eslint-disable no-underscore-dangle */
import status from 'http-status';
import EventSchema from '../Models/contentSchema';
import CourseSchema from '../Models/courseSchema';

const getContent = (req, res) => {
    const { Sid } = req.params;
    console.log(Sid);
    EventSchema.find({ courseId: Sid })
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

const addContentRefToCourse = (categoryId, SId) => {
    return new Promise((resolve, reject) => {
        // pushing id of comment to Article Model to get the comment by referemnce is articles
        // console.log(categoryId, SId);

        CourseSchema.findOneAndUpdate({ _id: categoryId }, { $push: { contentId: SId } }, { upsert: true, new: true },
            (err, doc) => {
                if (err) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject(
                        `Internal Server error. Cannot add content reference in course ${err}`,
                    );
                } else {
                    resolve(doc);
                    console.log(doc);

                }
            });
    });

};

const addContent = (req, res) => {
    const { lessonName, lessonContent, courseId } = req.body;

    const event = new EventSchema({

        lessonName,
        lessonContent,
        courseId

    });
    event
        .save()
        .then(async savedEvent => {
            console.log(savedEvent);
            await addContentRefToCourse(courseId, savedEvent._id);
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

const deleteContent = (req, res) => {
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

const editContent = (req, res) => {
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

const getSingleContent = (req, res) => {
    const { eid } = req.params;

    EventSchema.findOne({ _id: eid })
        .then(event => {
            if (!event) {
                return res.status(status.NOT_FOUND).send({
                    Message: ' not found',
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

export default { addContent, deleteContent, getContent, getSingleContent, editContent };