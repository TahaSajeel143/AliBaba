import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
   category:String,
   description:String,

}, {
    timestamps: true,
}, );

export default mongoose.model('category', categorySchema);