import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
    testName: String,
    testContent: [],
    contentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
    }],

}, {
    timestamps: true,
}, );

export default mongoose.model('Test', TestSchema);