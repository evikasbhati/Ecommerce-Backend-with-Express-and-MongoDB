const router = require('express').Router()
const User = require('../models/User')
const CryptoJS=require('crypto-js')
const JWT=require('jsonwebtoken')

///////   Registration  //////
router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        password:CryptoJS.AES.encrypt(JSON.stringify(req.body.password),process.env.PASS_CODE).toString(),
        email: req.body.email,
    })
    try {
        const savedUser = await newUser.save()
        // res.status(200).json(savedUser)
        res.status(200).json("user registered")
    }
    catch (err) {
        res.status(500).json(err);
    }

}) 
 
///////   Login  ////////
router.post('/login',async(req,resp)=>{
   try{
       /////  find user   ////////
    const user=await User.findOne({username:req.body.username})
    /////// get and decrypt password
    const hashpassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_CODE).toString(CryptoJS.enc.Utf8)
    
///// verify username & password  is correect
    !user && hashpassword!==req.body.password &&  resp.status(401).json("Username or passwrod is incorrect")
    

    const accessToken=JWT.sign({
        id:user._id,
        isadmin:user.isAdmin
    },process.env.JWT_SEC)

    ////not showing password on screen by destructuring
    const {password,...others}=user._doc

    resp.status(200).json({...others,accessToken})
   }catch(err){
       resp.status(500).json(err)
   } 
})

module.exports = router