const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator');


router.post('/',[
      body('password','Name must be atleast 5 characters').isLength({ min: 5 }),
  ],asyncHandler(async(req,res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {username,password} = req.body;
      if(!username| !password)
          {
              return res.status(401).json("Enter correct credentails");
          }
      const user = await User.findOne({username});
      if(!user)
      {
          return res.status(404).json("User doesn't exist ");
      }
      const validate = await bcrypt.compare(password,user.password)
      if(!validate)
      {
          return res.sendStatus(401).json("Password not matched")
      } 
        try {
            const {password ,...others} = user._doc
            return res.status(200).send({message:"Login successfully" });
            
        } catch (error) {
            return res.status(500).send({message:error.message});
        }


  }))


// router.get("/", async(req,res) =>{
//       try {
//             const user = await User.findOne({})
//             if(!user){
//                   return res.status(400).send({message:"Invalid link"});
//             }
//             const token = await Token.findOne({
//                   userId:user._id,
//                   token:req.params.token,
//             })
//             if(!token) return res.status(401).send({message:"Invalid link"});
//            const newUser= await User.findByIdAndUpdate(user._id,{isVerified:true});
           
//             await Token.findByIdAndDelete(token._id);

//             res.status(200).json(newUser);
//       } catch (error) {
//             return res.status(500).send({message:"Internal server error"});
//       }
// })

 module.exports = router;