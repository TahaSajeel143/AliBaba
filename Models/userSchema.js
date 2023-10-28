const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    dob: {
        type: String,
    },
    age: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    schoolContact: {
        type: String,
    },
    userType: {
        type: String,
        default: 'user',
    },
    phone: String,
    facebookId: String,
    googleId: String,
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
    }],
}, {
    timestamps: true,
}, );

export default mongoose.model('User', userSchema);