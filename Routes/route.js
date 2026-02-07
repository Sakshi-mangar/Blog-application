const express=require('express')
const router=express.Router()
const Contact=require("../Models/Model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const authMiddleware=require("../OAUTH/auth")
// router.get("/", (req, res) => 
// {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// router.post("/login",async(req,res)=>{

//     const {email,password}=req.body
//     if(!email || !password)
//     {
//       res.status(401).json({message:"Enter Details"})
//     }
//     const user= await Contact.findOne({email})
//     console.log(user)
//     if(!user)
//     {
//       res.status(401).json({message:"Invalid email"})
//     }
//     const isvalidpassword=await bcrypt.compare(password,user.password)
//     if(!isvalidpassword)
//     {
//       res.status(401).json({message:"Invalid Password"})
//     }
//     // const token=jwt.sign({id:user.id,email:user.email},process.env.Private_key,{algorithm:"HS256",expiresIn:"1hr"})
//     // res.status(201).json({token})
    
// })
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(typeof(email),typeof(password))
    if (!email || !password) {
      return res.status(400).json({ message: "Enter Details" });
    }

    const user = await Contact.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

  const token = jwt.sign({ id: user._id, email: user.email },process.env.Private_key,{ algorithm: "HS256", expiresIn: "1h" });
    res.status(200).json({message: "Login Successful",token: token});


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/register",async(req,res)=>{
    try 
    {
    const {name,email,password}=req.body
    console.log(req.body)
    const hashpassword=await bcrypt.hash(password,10);
    const contact=new Contact({name,email,password:hashpassword});
    await contact.save();
    return res.status(201).json({message:"User Registered Succesfully"})
    } 
    catch (error) 
    {
       return res.status(400).json({message:"Invalid Credentials"}) 
    }

})

router.get("/profile",authMiddleware,(req,res)=>{
    return res.json({message:"Hello User",user:req.user})
})

module.exports=router