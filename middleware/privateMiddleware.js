import Jwt  from "jsonwebtoken";

const  private_middle_ware =async(req,res,next)=>{
    {

        const {auth_token}= req.headers;
        if(auth_token){
            Jwt.verify(auth_token,process.env.Secret,(err,result)=>{
                if(err){
                    res.status(400).send({"err":"Wrong auth token"});
                    
                }else{
                next()
                }
            });

        }else{  
            //token cannot be null
            res.status(400).send({"err":"auth token cannot be empty"});
        }
    }
} 

export default private_middle_ware;