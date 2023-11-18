import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    bussinessCategory: String,
    companyName: String,
    country: String,
    email: String,
    firstName: String,
    lastName: String,
    otherPlatform: String,
    phoneNo: String,
    preferredOption: String,
    selectedCategory: String,
    selectedPlatforms: [],
    sellerAccountStatus:Boolean,
 


}, {
    timestamps: true,
},);

export default mongoose.model('seller', sellerSchema);