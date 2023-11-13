import mongoose from 'mongoose';

const addToCartSchema = new mongoose.Schema({
  orderDetails: [{
    size: String,
    price: Number,
    quantity: Number, 
  }],
  product: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },

  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usser',
    },

  ],
shippingAddress:[{
  country:String,
  address1:String,
  address2:String,
  province:String,
  city:String,
  zipCode:Number,
  fullName:String,
  phoneNumber:String,
  tag:[],
}],
totalquantity:Number,
shippingPrice:Number,
totalPrice:Number,
Status:Boolean,
  

},
  {
    timestamps: true,
  },);

export default mongoose.model('addtocart', addToCartSchema);


