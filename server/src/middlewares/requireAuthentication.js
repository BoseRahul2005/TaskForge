const {getAuth}= require('@clerk/express');

const requireAuthentication = async(req,res,next)=>{
    try{
        const auth = getAuth(req);
        if(!auth.userId){
            return res.status(401).json({error:"Unauthorized"});
        }
        req.auth = auth;
        next();
    }catch(error){
        console.error("Error in authentication middleware:", error);
        res.status(500).json({error:"Internal server error"});
    }
}
module.exports = requireAuthentication
