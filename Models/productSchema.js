import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title:String,
  description:String,
  reviews:Number,
  buyers:Number,
  priceOfPieces:[{
    price:Number,
    pieces:Number,
  }],
  benefits:String,
  color:[],
  customization:String,
  leadTime:[{
    quantity:String,
    leadTimedays:String
  }],
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
}],
images:[],
orderDetails:[{
  size:String,
  price:Number,
  quantity:Number,
  }],
  addedby: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ref',
  },



}, {
    timestamps: true,
}, );

export default mongoose.model('product', productSchema);