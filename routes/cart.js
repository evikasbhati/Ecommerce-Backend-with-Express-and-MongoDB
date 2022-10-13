const Cart = require('../models/Cart')
const { admin_auth, tokenAuth } = require('./verifyToken')

const router = require('express').Router()

///// Create Cart /////
router.post('/', async (req, resp) => {
    const newCart = new Cart(req.body)
    try {
        const saveCart = await newCart.save()
        resp.status(200).json(saveCart)
    }
    catch (err) {
        resp.status(500).json(err)
    }
})


///// Update  Cart////////
router.put('/:id', tokenAuth, async (req, resp) => {

    try {
        const updatedCart = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        resp.status(200).json(updatedCart)

    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Delete Cart /////////// 
router.delete('/:id', tokenAuth, async (req, resp) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        resp.status(200).json("Cart delted")
    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Get Cart /////////// 
router.get('/find/:userId', async (req, resp) => {
    try {
        const Cart = await Cart.findOne({userId:req.params.userId})
 

        resp.status(200).json(Cart)

    } catch (err) {
        resp.status(500).json(err)
    }
})

////// Get All carts/////
router.get('/',admin_auth,async(req,resp)=>{
    try{
        const carts=await Cart.find()
        resp.status(200).json(carts)
    }catch(err){
        resp.status(500).json(err)
    }
})

module.exports = router