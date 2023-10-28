const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   firstname:String,
   lastname:String,
   email:String,
   password:String,
   purpose:String,
   companyname:String,
   phone:String,
   country:String,
   isnotbussinessentinty:String,
}, {
    timestamps: true,
}, );

export default mongoose.model('User', userSchema);