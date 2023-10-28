/* eslint-disable no-underscore-dangle */
import status from 'http-status';
import EventSchema from '../Models/contentSchema';
import TestSchema from '../Models/testSchema';

const getTest = (req, res) => {
    const { Sid } = req.params;
    TestSchema.find({ contentId: Sid })
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

const addTestRefToContent = (categoryId, SId) => {
    return new Promise((resolve, reject) => {
        // pushing id of comment to Article Model to get the comment by referemnce is articles
        // console.log(categoryId, SId);

        EventSchema.findOneAndUpdate({ _id: categoryId }, { $push: { testId: SId } }, { upsert: true, new: true },
            (err, doc) => {
                if (err) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject(
                        `Internal Server error. Cannot add test reference in content ${err}`,
                    );
                } else {
                    resolve(doc);


                }
            });
    });

};

const addTest = (req, res) => {
    const { testName, testContent, contentId } = req.body;

    const event = new TestSchema({

        testName,
        testContent,
        contentId

    });
    event
        .save()
        .then(async savedEvent => {
            await addTestRefToContent(contentId, savedEvent._id);
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

const deleteTest = (req, res) => {
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

const editTest = (req, res) => {
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

const getSingleTest = (req, res) => {
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

export default { addTest, editTest, getSingleTest, deleteTest, getTest };