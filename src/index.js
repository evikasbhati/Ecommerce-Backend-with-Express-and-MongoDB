const express = require('express')
const serverless= require("serverless-http");

const app = express()
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

app.use(express.json())
app.use(cors())
app.use("/app/user/auth",authRoute)
app.use("/app/users",userroute)
app.use("/app/products",productsRoute)
app.use("/app/carts",cartRoute)
app.use("/app/orders",orderRoute)
app.use("/app/checkout",paymentRoute)


app.use('/.netlify/functions/index');  // path must route to lambda

/////// server /////
// app.listen(process.env.PORT || 5000, () => {
//     console.log("Server Online")
// })
module.exports = app;
