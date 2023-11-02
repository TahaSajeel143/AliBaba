import status from 'http-status';
import productSchema from '../Models/productSchema';
import categorySchema from '../Models/categorySchema';

const addproduct = async (req, res) => {
    try {
        const { title ,description, reviews, buyers,  priceOfPieces, benefits, color, customization, leadTime, category } = req.body;

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
        const { category, description } = req.body;
  
        const newcategory = new categorySchema({
            category,
            description,
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
	  .then(product => {
		if (product.length > 0) {
		  res.status(status.OK).send(product);
		} else {
		  res.status(status.NOT_FOUND).send({
			Message: 'No hotels found.',
		  });
		}
	  })
	  .catch(err => {
		console.error(err);
		res.status(status.INTERNAL_SERVER_ERROR).send({
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
        Message: 'user not found.',
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

export default{
    addproduct,
    addcategory,
    getAllProducts,
    getOneProduct,
};