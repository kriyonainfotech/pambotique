// const Cart=require('./../models/cartModel')
// const Product=require('./../models/productModel')


// const addToCart=async(req,res)=>{
//     const { userId, productId, size, stitchingOption, quantity, totalPrice } = req.body;
//     try {
//         const cartItem= await Cart.create({
//             userId,
//             productId,
//             size,
//             stitchingOption,
//             quantity,
//             totalPrice
//         });
//         res.status(201).json({message:"Product added To Cart"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Error adding to cart' });
//     }
// };

// const deleteCartItem=async(req,res)=>{
//     try{
//         const {id}=req.params
//         const cartItem=await Cart.findByPk(id)
//     if(!cartItem){
//         return res.status(404).json({ message: 'Product not found' });
//     } 
//         await cartItem.destroy();
//         res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete product', error });
//     }
//     };


//     const fetchCartWithProducts = async (userId) => {
//       try {
//           const cartItems = await Cart.findAll({
//               where: { userId }, // Fetch only user's cart items
//               include: [{
//                   model: Product,
//                   attributes: ['id', 'name', 'price','images','description'], // Include image for product
//               }]
//           });
//             console.log("Fetching cart for userId:", userId);
//            // console.log("Cart Items Fetched:", cartItems);

  
//           return cartItems.map(item => ({
//             id: item.id,
//             quantity: item.quantity,
//             size: item.size,
//             stitchingOption: item.stitchingOption,
//             totalPrice: item.totalPrice,
//             product: {
//                 id:item.Product.id,
//                 name:item.Product.name,
//                 price:item.Product.price,
//                 description:item.Product.description,
//                 images:item.Product.images
//                 }
//           }));
//       } catch (error) {
//           console.error("Error fetching cart with products:", error);
//           throw error;
//       }
//     };
    
    

//     // Fetch cart items for a user
// const getCart = async (req, res) => {
//     try {
//       const userId = req.params.userId; // Get userId from URL parameter
  
//       // Fetch the cart items for the given userId
//       const cartItems = await fetchCartWithProducts(userId);
  
//       // If there are no items in the cart, return an empty array
//       if (!cartItems || cartItems.length === 0) {
//         return res.status(404).json({ message: "Cart is empty" });
//       }
  
//       res.status(200).json(cartItems);
//     } catch (error) {
//       console.error("Error fetching cart items", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  


// module.exports={addToCart,deleteCartItem,getCart}

const Cart = require('./../models/cartModel');
const Product = require('./../models/productModel');

const addToCart = async (req, res) => {
    const { userId, productId, size, stitchingOption, quantity, totalPrice } = req.body;
    try {
        const cartItem = await Cart.create({
            userId,
            productId,
            size,
            stitchingOption,
            quantity,
            totalPrice
        });
        res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error adding to cart' });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await Cart.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await cartItem.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};

// ✅ New Function to Update Cart Quantity ✅
const updateCartQuantity = async (req, res) => {
    try {
        const { id } = req.params; // Cart item ID
        const { quantity } = req.body; // New quantity

        // Find the cart item by ID
        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Update quantity & total price
        cartItem.quantity = quantity;
        cartItem.totalPrice = cartItem.quantity * cartItem.price; // Assuming price is stored in the cart table

        await cartItem.save(); // Save changes

        res.status(200).json({ message: "Quantity updated successfully", cartItem });
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ message: "Failed to update quantity" });
    }
};

// Fetch cart items with product details
const fetchCartWithProducts = async (userId) => {
    try {
        const cartItems = await Cart.findAll({
            where: { userId }, // Fetch only user's cart items
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'images', 'description'], // Include product details
            }]
        });

        console.log("Fetching cart for userId:", userId);

        return cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            size: item.size,
            stitchingOption: item.stitchingOption,
            totalPrice: item.totalPrice,
            product: {
                id: item.Product.id,
                name: item.Product.name,
                price: item.Product.price,
                description: item.Product.description,
                images: item.Product.images
            }
        }));
    } catch (error) {
        console.error("Error fetching cart with products:", error);
        throw error;
    }
};

// Fetch cart items for a user
const getCart = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from URL parameter

        // Fetch the cart items for the given userId
        const cartItems = await fetchCartWithProducts(userId);

        // If there are no items in the cart, return an empty array
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addToCart, deleteCartItem, updateCartQuantity, getCart };
