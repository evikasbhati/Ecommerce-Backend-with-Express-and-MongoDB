const JWT = require("jsonwebtoken");

const verifyToken=(req,resp,next)=>{
    const authHeader=req.headers.token
    if(authHeader){
        const token=authHeader.split(' ')[1]
        JWT.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) resp.status(403).json("Invalid Token")
            req.user=user
            next()
        })
    }else{
        return resp.status(401).json("Not authenticated")
    }

}
const tokenAuth=(req,resp,next)=>{
    verifyToken(req,resp,()=>{
        if(req.user.id===req.params.id || req.user.isadmin){
            next()
        }else{
            resp.status(403).json("Unauthoriesed")
        }
    })
}
const admin_auth=(req,resp,next)=>{
    verifyToken(req,resp,()=>{
        if(req.user.isadmin){
            next() 
        }else{
            resp.status(403).json("Unauthoriesed")
        }
    })
}

module.exports={verifyToken,tokenAuth,admin_auth}