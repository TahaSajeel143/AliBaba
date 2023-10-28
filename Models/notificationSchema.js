import mongoose from 'mongoose';

const pushNotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    },
    link: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
}, );

export default mongoose.model('Notifications', pushNotificationSchema);