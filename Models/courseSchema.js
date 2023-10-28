import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    courseName: String,
    contentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
    }],
    maxCapacity: {
        type: Number,
        required: true,
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    instructorId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
    }],
    coursesLink: String

}, {
    timestamps: true,
}, );

export default mongoose.model('Courses', CourseSchema);