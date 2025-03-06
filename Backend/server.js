const express=require('express')
const app=express()
const sequelize=require('./config/db')
const cors=require('cors')
const { User, Product, Cart, Order, OrderItem, Category } = require('./models/relationships');
const Customize=require('./models/customTshirtModel')

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true })); 

const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoute')
const customTshirtRoute=require('./routes/customTshirtRoute')

app.use('/user',userRoutes)
app.use('/product',productRoutes)
app.use('/cart',cartRoutes) 
app.use('/order',orderRoutes)
app.use('/contact',customTshirtRoute)

app.get('/', (req, res) => {
    res.send('Hello, welcome to the E-commerce API!');
  });

sequelize.sync({ force: false })  // 'force: true' will drop the tables and recreate them
  .then(() => {
    console.log("Database synced!");
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  }); 

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});