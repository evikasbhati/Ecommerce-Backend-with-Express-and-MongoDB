const express = require('express')
const serverless= require("serverless-http");

const api = express()
const mongoose = require('mongoose')
const userroute=require('../routes/user')
const authRoute=require('../routes/auth')
const productsRoute=require('../routes/product')
const cartRoute=require('../routes/cart')
const orderRoute=require('../routes/order')
const paymentRoute=require('../routes/payment')
const dotenv=require('dotenv')
const cors=require('cors')


dotenv.config()

////////DataBase connection/////////
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("DB is connected")})
.catch((err)=>{err,console.log("can't connect")})

api.use(express.json())
api.use(cors())
api.use("/api/user/auth",authRoute)
api.use("/api/users",userroute)
api.use("/api/products",productsRoute)
api.use("/api/carts",cartRoute)
api.use("/api/orders",orderRoute)
api.use("/api/checkout",paymentRoute)


/////// server /////
// api.listen(process.env.PORT || 5000, () => {
//     console.log("Server Online")
// })
export const handler=serverless(api)