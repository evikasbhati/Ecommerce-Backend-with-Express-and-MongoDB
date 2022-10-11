const mongoose= require('mongoose')

const ProductsSchema=new mongoose.Schema({
    title:{type:String,},
    disc:{type:String,},
    img:{type:String,},
    price:{type:Number,},
    size:{type:Array,},
    color:{type:Array,},
    catogories:{type:Array,},
    instock:{type:Boolean,}
},{timestamps:true})

module.exports= mongoose.model("Product",ProductsSchema)