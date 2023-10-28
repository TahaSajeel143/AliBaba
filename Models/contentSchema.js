import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    lessonName: String,
    lessonContent: [],
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
    }],
    testId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
    }],

}, {
    timestamps: true,
}, );

export default mongoose.model('Content', ContentSchema);