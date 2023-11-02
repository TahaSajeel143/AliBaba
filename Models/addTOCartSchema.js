import mongoose from 'mongoose';

const addToCartSchema = new mongoose.Schema({
   
    
        product:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
              },
        
            ],
            user:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'usser',
                  },
            
                ],
            
    },
 {
    timestamps: true,
}, );

export default mongoose.model('addtocart', addToCartSchema);


