import mongoose from 'mongoose';


const  mongooseConnect = (dbUrl)=>{
    mongoose.connect(dbUrl,{
    family:4
 });
 }  



 export default mongooseConnect;