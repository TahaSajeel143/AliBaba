const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    imageUrl:String,
    comment:String

}, {
    timestamps: true,
}, );

export default mongoose.model('feedback', feedbackSchema);