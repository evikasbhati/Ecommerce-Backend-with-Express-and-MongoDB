const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
            productId:{type:String,required:true},
            quantity:{type:Number,default:1}
        }
    ],
    Amount:{type:Number,required:true},
    Address:{type:Object,required:true},
    img:{type:String},
    Status:{type:String,default:"pending"}
},{timestamps:true})

module.exports=mongoose.model("Order",OrderSchema)