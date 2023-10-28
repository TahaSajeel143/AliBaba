import mongoose from 'mongoose';

const WishListSchema = new mongoose.Schema({
    item: String,
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

}, {
    timestamps: true,
}, );

export default mongoose.model('Wishlist', WishListSchema);