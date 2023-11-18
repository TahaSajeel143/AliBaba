const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   firstName:String,
   lastName:String,
   email:String,
   password:String,
   purpose:String,
   companyName:String,
   phone:String,
   country:String,
   isNotBussinessEntity:Boolean,
}, {
    timestamps: true,
}, );

export default mongoose.model('User', userSchema);