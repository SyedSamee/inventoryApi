import userModel from "../schema/registerSchema.js";
import bycrpt from "bcrypt";
import Jwt  from "jsonwebtoken";


 class authController{
    static register_A_User =async(req,res)=>{
   
         const {name,email,password,confirm_password} = req.body;
     
         if(name && email&& password &&confirm_password){
       
           if(password === confirm_password){
            try {
               bycrpt.hash(password,10,async(er,hashPassword)=>{
                   
                    const response = await userModel({
                       name:name,
                       email:email,
                       password:hashPassword
                   });
                   var findedResponse= await userModel.find({email:email});
                   if(findedResponse.length ==0){
                     await response.save();
                     
                     var token = Jwt.sign({email},process.env.Secret,{expiresIn:"5d"});


                     var selectedResponse = await userModel.findOne({email:email}).select("-password");
  
  
  
                      res.status(201).send({"response":{
                        "accessToken":token,
                        "detail":selectedResponse
                      }});
                   }else{
                      res.status(400).send({"error":"User already exist"})
                   }
                   
                 
                   
                 
               })
       
              } catch (error) {
              //  print(error)
              }
           }else{
            res.status(400).send({"error":"Password does'nt match"})
           }
     
         }else{
             res.status(404).send({"error":"one of the field is empty"})
          
         }
     
    }

    static loginUser=async(req,res)=>{
      const {email,password}= req.body;
      if(email,password){
         const data= await userModel.findOne({email:email});
         if(data){
               bycrpt.compare(password,data.password,(err,result)=>{
                  if(err){
                     res.status(404).send({"error":"incorrect password or email"});

                  }else if(result == true){
                  const token =  Jwt.sign({email},process.env.Secret,{expiresIn:"5d"});
                     res.status(404).send({"msg":"successfull","response":{
                        "access_token":token,
                        "user_detail":data
                     }});
                  }else{
                     res.status(404).send({"error":"incorrect password or email"});

                  }
               })
         }else{
  
            res.status(404).send({"error":"User does'nt exist"});
         }
      }else{
  

         res.status(404).send({"error":"all field are required"});


      }
    }

    //change password

    static changePassword=async(req,res)=>{
      

     try {
      const {email,password,newPassword}= req.body;
      if(email,password,newPassword){
         const data= await userModel.findOne({email});

        if(password !== newPassword){
         if(data){
            bycrpt.compare(password,data.password,(err,result)=>{
              if(result== true){
                     bycrpt.hash(newPassword,10,async(err,hashPassword)=>{
                        await userModel.updateOne({email:email},{password:hashPassword})
                        const letData = await userModel.findOne({email:email});
                      const token=  Jwt.sign({email},process.env.Secret,{expiresIn:"5d"})
                        res.status(200).send({"msg":"Password changed succesfully","response":{
                           "access_token":token,
                           "user_detail":letData}});
                     });
              }else{
               res.status(404).send({"error":"Wrong password"});
              }
            });
            
         }else{
            res.status(403).send({"error":"User Does'nt exist"});
         }
        }else{
         res.status(403).send({"error":"password cannot be same"});
        }
      }else{
         res.status(403).send({"error":"all field are required"});
      }
     } catch (error) {
      res.status(403).send({"error":"something went wrong try again later"});
     }
    }

   
   }

 export default authController;