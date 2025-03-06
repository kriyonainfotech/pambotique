const User=require('./../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
require('dotenv').config()


const generateToken=(user)=>{
    return jwt.sign(
        {id:user.id,role:user.role},
        process.env.JWT_SECRET,{expiresIn:'1d'}
    );
}

const signup= async(req,res)=>{
    const {name,email,password}=req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // if (password !== confirmPassword) {
            // return res.status(400).json({ message: 'Passwords do not match' });
            // }

    try {
        const existingUser= await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({message:'Email Alredy Exist...'})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token=generateToken(newUser)
        console.log('TOKEN:',token);
        res.status(200).json({message:'User Signed Up Successfully...',user:newUser,token})
        
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

const login = async (req, res) => {
  try {
      const {email, password } = req.body;

      // Static admin login
      if (email === "pamboutique@gmail.com" && password === "Admin@123") {
          const token = generateToken({ role: "admin" });
          return res.status(200).json({
              message: "Admin Login Successful",
              token,
              role: "admin",
          });
      }

      // Normal user login
      const user = await User.findOne({ where: { email } });

      if (!user) {
          return res.status(401).json({ message: "User Not Registered...or not found" });
      }

      // Compare password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
          return res.status(404).json({ message: "Invalid Password" });
      }

      const token = generateToken({ id: user.id, role: user.role });
      console.log(token);

      return res.status(200).json({
          message: "Login Successful",
          token,
          role: user.role,
          userId:user.id
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
  }
};

  
const logout = async (req, res) => {
    res.clearCookie('token');  // Clear token stored in cookies (if using cookies)
    res.status(200).send({ message: 'Logged out successfully' });
  };

  const getUsers=async (req,res)=>{
    try {
      const users=await User.findAll({
        attributes:['id','name','email']
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  module.exports={signup,login,logout,getUsers}