import express, { response } from "express";
import inventorySchema from "../schema/inventorySchema.js";
import mongoose from "mongoose";

const Router = express.Router();

Router.post('/add/inventory',async(req,res)=>{
   const {inv_name,price,qun,totalSale} = req.body;

   if(inv_name,price,qun){
  var responese =  await new inventorySchema({
    inventory_name:inv_name,
    price:price,
    qun:qun
   });

 var dataResp=  await responese.save();

if(dataResp){
    res.status(201).send({"success":true,"response":dataResp});
}
   }else{
    console.log("one of the field is empty");
   }

});


Router.get('/get/inventory',async(req,res)=>{
   var response= await inventorySchema.find();

   if(response){
    res.status(201).send({"success":true,"response":response});
   }else{}
})


//add more stock to your inventory
Router.post('/update/inventory/stock',async(req,res)=>{
   var {resId,name,price,stockUnit} = req.body; 
   
   if(resId){
      // update any one or all the stock 
         //updating stock 
         try {
            
            var letestResponse = await inventorySchema.findById(resId);
      
            var updatedResponse = await inventorySchema.findByIdAndUpdate(resId,{
               inventory_name: String(name).length >= 1? name : letestResponse["inventory_name"],
               price: String(price).length >= 1 ? price :letestResponse["price"],
               qun: String(stockUnit).length >= 1 ? stockUnit : letestResponse["qun"],});
               var response = await inventorySchema.findById(resId);
         
            
            // updating successfully 
            res.status(201).send({"successfull":true,"response":response});
         } catch (error) {
                  console.log(error);
            //something went wrong
            res.status(403).send({"successfull":false,"error":"Id does'nt exist"});
         }


   }else{
      //one of the field is empty
      res.status(403).send({"successfull":false,"error":"one or more field is empty or stock format is not right"});
   }




},
Router.delete('/delete/inventory',async(req,res)=>{
   const {prId} = req.body;

   if(prId){
     try {
      const response =  await inventorySchema.findByIdAndDelete(prId);

   
         res.status(200).send({"successfull":true,"msg":"item deleted"});
         
 
     } catch (error) {
      res.status(403).send({"successfull":false,"msg":"id does'nt exist"});
     }
   }else{
 

      res.status(403).send({"successfull":false,"error":"id cannot be empty"});
   }

})

);





export default Router;
