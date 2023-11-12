import mongoose from 'mongoose';

const buyNowSchema = new mongoose.Schema({
  totalPrice: Number,
  quantity: Number,
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },

  ],
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },

  ],





}, {
  timestamps: true,
},);

export default mongoose.model('buyNow', buyNowSchema);