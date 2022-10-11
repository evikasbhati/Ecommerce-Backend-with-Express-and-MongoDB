const router =require('express').Router()

// const key=process.env.Stripe_Seckey
const Stripe=require('stripe')
const stripe=Stripe("sk_test_51KfIpiSFe435id6wipvRH922du0lD18i6OXqjzLb2MoiiAOj7IZXQLF7hhgg6CoTrXBIAxdiSl66z9wigVJDcpwo00lcW5rzWJ")
router.post('/payment',(req,resp)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"inr"
    },(err,order)=>{
        if(err){
            resp.status(500).json(err)
        }else{
            resp.status(200).json(order)
        }
    }
    
    )
    
})
module.exports=router

