const User = require('../models/User')
const { tokenAuth, admin_auth } = require('./verifytoken')

const router = require('express').Router()

///// User Updation ////////
router.put('/:id', tokenAuth, async (req, resp) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.pass_us_code).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        resp.status(200).json(updatedUser)

    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Delete /////////// 
router.delete('/:id',tokenAuth,async(req,resp)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        resp.status(200).json("User delted")
    }catch(err){
        resp.status(500).json(err)
    }
})

/////// Get User /////////// 
router.get('/find/:id',admin_auth,async(req,resp)=>{
    try{
       const user= await User.findById(req.params.id)

        ////not showing password on screen by destructuring
    const {password,...others}=user._doc
    resp.status(200).json(others)

    }catch(err){
        resp.status(500).json(err)
    }
})

/////// Get All User /////////// 
router.get('/',admin_auth,async(req,resp)=>{
    const query=req.query.new
    try{
       const users= query ?await User.find().sort().limit(5) : await User.find({})

        ////not showing password on screen by destructuring
    // const {password,...others}=users._doc
    resp.status(200).json(users)

    }catch(err){
        resp.status(500).json(err)
    }
})

///// Get stats ///////
router.get('/stats',admin_auth,async(req,resp)=>{
    const date=new Date()
    const lastYear=new Date(date.setFullYear(date.getFullYear() -1))
    try{
        const data=await User.aggregate([
            {
                $match:{createdAt:{$gte:lastYear}}
            },
            {
                $project:{month:{$month:"$createdAt"}}
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ])
        resp.status(200).json(data)

    }catch(err){
        resp.status(500).json(err)
    }

})
module.exports = router