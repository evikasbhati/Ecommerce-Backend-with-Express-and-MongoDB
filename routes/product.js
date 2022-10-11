const Product = require('../models/Product')
const { admin_auth } = require('./verifytoken')

const router = require('express').Router()

///// Create /////
router.post('/add', admin_auth, async (req, resp) => {
    const newProduct = new Product(req.body)
    try {
        const saveProduct = await newProduct.save()
        resp.status(200).json(saveProduct)
    }
    catch (err) {
        resp.status(500).json(err)
    }
})


///// Update Product ////////
router.put('/:id', admin_auth, async (req, resp) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        resp.status(200).json(updatedProduct)

    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Delete Product /////////// 
router.delete('/:id', admin_auth, async (req, resp) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        resp.status(200).json("Product deleted")
    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Get Product /////////// 
router.get('/find/:id', async (req, resp) => {
    try {
        const product = await Product.findById(req.params.id)


        resp.status(200).json(product)

    } catch (err) {
        resp.status(500).json(err)
    }
})

/////// Get All Products /////////// 
router.get('/', async (req, resp) => {
    const newQuery = req.query.new
    const catogortQuery = req.query.catogory
    try {
        let products
        if (newQuery) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (catogortQuery) {
            products = await Product.find({
                catogories: {
                    $in: [ catogortQuery ]
                }
            })
        } else {
            products = await Product.find()
        }


        resp.status(200).json(products)

    } catch (err) {
        resp.status(500).json(err)
    }
})


module.exports = router