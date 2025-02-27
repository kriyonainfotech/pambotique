const Product = require('./../models/productModel');
const { Op } = require('sequelize');
const upload=require('../middlewares/uploadMiddleware')

const addProducts = async (req, res) => {
  // Use upload.array('images', 4) to accept multiple files (up to 4 in this case)
  upload.array('images', 4)(req, res, async (err) => {
      if (err) {
          console.error("Error during file upload:", err);
          return res.status(400).json({ message: err.message });
      }

      // Extract other fields from the request body
      const { name, price, originalPrice, description, stock, categoryId } = req.body;

      // Get file paths of the uploaded images (if any)
      const imageUrls = req.files ? req.files.map(file => file.path) : [];

      try {
          // Create the product in the database
          const newProduct = await Product.create({
              name,
              price,
              originalPrice,
              description,
              images: imageUrls, // Save the image URLs in the database
              stock,
              categoryId,
          });

          // Send a response with the new product
          res.status(201).json(newProduct);
          console.log('Product Added...');
      } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Failed to create product', error });
      }
  });
};

const getProducts = async (req, res) => {
    const { search,price,categories, minPrice, maxPrice, sortOrder } = req.query;

    const whereClause = {};
    const orderClause = [];
  
    if (search) {
        whereClause.name = { [Op.like]: `%${search}%` };  // Case-insensitive search for product name
      }

      if (price) {
        whereClause.price = Number(price); // Exact price match
      }


    // Filter by categories
    if (categories) {
      whereClause.category = { [Op.in]: categories.split(',') };
    }
  
    // Filter by price range
    if (!price && (minPrice || maxPrice)) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = Number(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = Number(maxPrice);
    }
  
    // Sorting logic
    switch (sortOrder) {
      case 'Most Popular':
        orderClause.push(['popularity', 'DESC']);
        break;
      case 'Best Rating':
        orderClause.push(['rating', 'DESC']);
        break;
      case 'Newest':
        orderClause.push(['createdAt', 'DESC']);
        break;
      case 'Price Low - High':
        orderClause.push(['price', 'ASC']);
        break;
      case 'Price High - Low':
        orderClause.push(['price', 'DESC']);
        break;
      default:
        break;
    }
  
    try {
      const products = await Product.findAll({
        where: whereClause,
        order: orderClause.length ? orderClause : [['createdAt', 'DESC']], // Default order if none selected
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };

  const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, originalPrice, description, stock, categoryId, images } = req.body;

        console.log("Product ID:", productId);
        console.log("Existing Images:", images);

        // Find existing product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let updatedImages = images; // Use existing images if no new images uploaded

        // If new images are uploaded
        if (req.files && req.files.length > 0) {
            updatedImages = req.files.map(file => `uploads/${file.filename}`);
        }

        // ✅ Fix: Directly store array (Remove JSON.stringify)
        const updatedProduct = await product.update({
            name,
            price,
            originalPrice,
            description,
            stock,
            images: updatedImages,  // JSON.stringify removed
            categoryId,
        });

        res.status(200).json(updatedProduct);
        console.log("Updated Product:", updatedProduct);
        console.log("Product Updated Successfully");
        
    } catch (error) {
        console.error("Error Updating Product:", error);
        res.status(500).json({ message: 'Failed to update product', error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
        console.log("product deleted ....");
        
    } catch (error) {
        console.log(error);
      
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};


module.exports = { addProducts, getProducts, updateProduct, deleteProduct };


// const updateProduct = async (req, res) => {

  //     try {
  //       // upload.array('images', 4)(req, res, async (err) => {
  //       //   console.log("reqbody",req.body);
  //       //   if (err) {
  //       //       console.error("Error during file upload:", err);
  //       //       return res.status(400).json({ message: err.message });
  //       //   }
        
  //         const { productId } = req.params;
  //         console.log("productid",req.params.productId);
          
  //         const { name, price, originalPrice, description,images,stock, categoryId } = req.body;
          
          
  //         console.log("body",req.files);
  
  //         const product = await Product.findByPk(productId);
  //         if (!product) {
  //             return res.status(404).json({ message: 'Product not found' });
  //         }
  //         const updatedProduct = await product.update({
  //             name,
  //             price,
  //             originalPrice,
  //             description,
  //             stock,
  //             images,
  //             categoryId,
  //         });
  //         res.status(200).json(updatedProduct);
  //         console.log("Updated Data",req.body);
  //         console.log("updated product is ",updateProduct);
    
  //         console.log("Product Updated Successfully");
  //      // });
        
  //     } catch (error) {
  //         console.log(error);
  //         res.status(500).json({ message: 'Failed to update product', error });
  //     }
  // };

