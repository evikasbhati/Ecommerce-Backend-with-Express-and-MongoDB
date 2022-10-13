const Order = require('../models/Order')
const { admin_auth, tokenAuth } = require('./verifyToken')

const router = require('express').Router()

///// Create Order /////
router.post('/', tokenAuth,async (req, resp) => {
    const newOrder = new Order(req.body)
    try {
        const saveOrder = await newOrder.save()
        resp.status(200).json(saveOrder)
        console.log(saveOrder)
    }
    catch (err) {
        resp.status(500).json(err)
    }
})


///// Update  Order ////////
router.put('/:id', admin_auth, async (req, resp) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        resp.status(200).json(updatedOrder)
        

    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Delete order /////////// 
router.delete('/:id', admin_auth, async (req, resp) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        resp.status(200).json("order delted")
    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Get Cart /////////// 
router.get('/find/:userId',tokenAuth, async (req, resp) => {
    try {
        const order = await Order.find({userId:req.params.userId})
 

        resp.status(200).json(order)

    } catch (err) {
        resp.status(500).json(err)
    }
})

////// Get All carts/////
router.get('/',admin_auth,async(req,resp)=>{
    try{
        const orders=await Order.find()
        resp.status(200).json(orders)
    }catch(err){
        resp.status(500).json(err)
    }
})

////// Get monthly income /////
router.get('/income',admin_auth,async(req,resp)=>{
    const date =new Date()
    const lastMonth= new Date(date.setMonth(date.getMonth() -1))
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth() -1))
    try{
        const income=await Order.aggregate([
        {$match:{createdAt:{$gte:previousMonth}}},
        {
            $project:{
                month:{$month:"$createdAt"},
                sales:"$Amount"
            }
        },
        {
            $group:{ 
                _id:"$month",
                total:{$sum:"$sales"}
            }
        }
    ])
        resp.status(200).json(income)
    }catch(err){
        resp.status(500).json(err)
    }
})

module.exports = router