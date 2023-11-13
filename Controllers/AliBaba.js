import status from 'http-status';
import Pusher from 'pusher';
import productSchema from '../Models/productSchema';
import categorySchema from '../Models/categorySchema';
import addTOCartSchema from '../Models/addTOCartSchema';
import buyNowSchema from '../Models/buyNowSchema';

const addproduct = async (req, res) => {
    try {
        const { title ,description, reviews, buyers,  priceOfPieces, benefits, color, customization, leadTime, category, images, orderDetails } = req.body;

        const newProduct = new productSchema({
            title,
            description,
            reviews,
            buyers,
            priceOfPieces,
            benefits,
            color,
            customization,
            leadTime,
            category,
            images,
            orderDetails
        });

        const savedProduct = await newProduct.save(); // Use await here
         res.status(status.OK).send({
            savedProduct, // Use the correct variable name
            Message: 'Product Added Successfully',
            type: status.OK,
        });
    } catch (err) {
        console.error('Error adding product:', err); // Log the error for debugging
        res.status(status.INTERNAL_SERVER_ERROR).send({
            Message: 'Internal Server Error',
            error: err.message, // Send the error message in the response
        });
    }
};


const addcategory = async (req, res) => {
    try {
        const { category, description, path, images } = req.body;
  
        const newcategory = new categorySchema({
            category,
            description,
            path,
            images,
        });
  
        const savedcategory = await newcategory.save(); // Use await here
  
        res.status(status.OK).send({
            savedcategory, // Use the correct variable name
            Message: 'Product Added Successfully',
            type: status.OK,
        });
    } catch (err) {
        console.error('Error adding product:', err); // Log the error for debugging
        res.status(status.INTERNAL_SERVER_ERROR).send({
            Message: 'Internal Server Error',
            error: err.message, // Send the error message in the response
        });
    }
  };




const getAllProducts = (req, res) => {
    productSchema.find({})
      .then(products => {
        res.status(status.OK).json({
          products
        });
      })
      .catch(err => {
        console.error(err);
        res.status(status.INTERNAL_SERVER_ERROR).json({
          Message: 'Internal server error',
          Error: err.message,
        });
      });
  };

  
const getOneProduct = (req, res) => {
    const { id } = req.params; // Assuming the city is passed as a parameter
    
    productSchema.findOne({_id:id})
      .then (product => {
      if (product) {
        res.status(status.OK).send(product);
      } else {
        res.status(status.NOT_FOUND).send({
        Message: 'product not found.',
        });
      }
      })
      .catch(err => {
      console.log(err)
      res.status(status.INTERNAL_SERVER_ERROR).send({
        Message: 'Internal server error',
        Error: err,
      });
      });
    };


const getAllCategories = (req, res) => {
      categorySchema.find({})
        .then(category => {
          res.status(status.OK).json({
            category
          });
        })
        .catch(err => {
          console.error(err);
          res.status(status.INTERNAL_SERVER_ERROR).json({
            Message: 'Internal server error',
            Error: err.message,
          });
        });
    };


 const getOnecategory = (req, res) => {
      const { id } = req.params; // Assuming the city is passed as a parameter
      
      categorySchema.findOne({_id:id})
        .then (category => {
        if (category) {
          res.status(status.OK).send(category);
        } else {
          res.status(status.NOT_FOUND).send({
          Message: 'product not found.',
          });
        }
        })
        .catch(err => {
        console.log(err)
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Internal server error',
          Error: err,
        });
        });
      };


const AddToCart = (req, res) => {
      const { product, user, orderDetails } = req.body;
    
      // Assuming you have properly defined the addtoCartSchema model
      const AddToCart = new addTOCartSchema({
        product,
        user,
        orderDetails,
      });
    
      AddToCart
        .save()
        .then(savedAddToCart => {
          res.status(status.OK).send({
            savedAddToCart,
            Message: 'Cart Added Successfully',
            type: status.OK,
          });
        })
        .catch(err => {
          res.status(status.INTERNAL_SERVER_ERROR).send({
            Message: 'Internal Server Error',
            error: err.message, // Use err.message to capture the error message
          });
        });
    };


const getAllCarts = (req, res) => {
      addTOCartSchema.find({})
        .then(addtocart => {
          res.status(status.OK).json({
            addtocart
          });
        })
        .catch(err => {
          console.error(err);
          res.status(status.INTERNAL_SERVER_ERROR).json({
            Message: 'Internal server error',
            Error: err.message,
          });
        });
    };



    const patchproducts = async (req, res) => {
      const { productId } = req.params;
    
      try {
        // Find the city by its ID
        let product = await productSchema.findById(productId);
    
        if (!product) {
          // Return a 404 response with a message indicating that the city was not found
          return res.status(404).json({ success: false, message: 'City not found' });
        }
    
        // Update the existing city's settings with the provided data
        product.set(req.body);
        await product.save();
    
        res.status(200).json({ success: true, message: 'City settings updated', data: product });
      } catch (error) {
        console.error('Error updating city settings:', error);
        res.status(500).json({ success: false, message: 'Failed to update city settings' });
      }
    };
    
    
    
const buyNow = async (req, res) => {
      const { totalPrice, quantity, product, user } = req.body;
  
  
    const newbuyNow = new buyNowSchema
      try {
        
          const purchase = {
            totalPrice,
            quantity,
            product,
            user,
  
      
              // You can add more details as needed.
          };
  
      
          res.status(status.OK).send({
              purchase,
              message: 'Purchase Successful',
              type: status.OK,
          });
      } catch (error) {
          console.error('Error during purchase:', error);
          res.status(status.INTERNAL_SERVER_ERROR).send({
              message: 'Purchase Failed',
              error: error.message,
              type: status.INTERNAL_SERVER_ERROR,
          });
      }
  };









  const DeleteCartItem = (req, res) => {
    const { cartItemId } = req.params; // Assuming cartItemId is the parameter for identifying the cart item to be deleted
  
    // Assuming you have properly defined the CartItemSchema model
    addTOCartSchema.findByIdAndRemove(cartItemId)
      .then(deletedCartItem => {
        if (!deletedCartItem) {
          return res.status(status.NOT_FOUND).send({
            Message: 'Cart item not found',
            type: status.NOT_FOUND,
          });
        }
  
        res.status(status.OK).send({
          deletedCartItem,
          Message: 'Cart item deleted successfully',
          type: status.OK,
        });
      })
      .catch(err => {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Internal Server Error',
          error: err.message,
        });
      });
  };
  
 



  const DeleteProduct = (req, res) => {
    const { productId } = req.params; // Assuming cartItemId is the parameter for identifying the cart item to be deleted
  
    // Assuming you have properly defined the CartItemSchema model
    productSchema.findByIdAndRemove(productId)
      .then(deletedproduct => {
        if (!deletedproduct) {
          return res.status(status.NOT_FOUND).send({
            Message: 'Cart item not found',
            type: status.NOT_FOUND,
          });
        }
  
        res.status(status.OK).send({
          deletedproduct,
          Message: 'Cart item deleted successfully',
          type: status.OK,
        });
      })
      .catch(err => {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Internal Server Error',
          error: err.message,
        });
      });
  };







  




export default{
    addproduct,
    addcategory,
    getAllProducts,
    getAllCategories,
    getOneProduct,
    getOnecategory,
    AddToCart,
    getAllCarts,
    patchproducts,
    buyNow,
    DeleteCartItem,
    DeleteProduct,
   
   

};