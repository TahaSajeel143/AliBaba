import mongoose from 'mongoose';

const buyNowSchema = new mongoose.Schema({
   

}, {
    timestamps: true,
}, );

export default mongoose.model('buyNow', buyNowSchema);