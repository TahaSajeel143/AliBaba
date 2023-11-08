import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title:String,
  description:String,
  reviews:Number,
  buyers:Number,
  priceOfPieces:[{
    price:String,
    pieces:String,
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
quantity:Number,



}, {
    timestamps: true,
}, );

export default mongoose.model('product', productSchema);