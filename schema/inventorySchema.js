import mongoose, { mongo } from "mongoose";


const Schema = new mongoose.Schema({
    inventory_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required: true
    },
    qun:{
        type:Number,
        required:true
    },
    totalSale:{
        type:Number,
        required:false
    }
})

const inventorySchema = mongoose.model('inventorySchema',Schema);


export default inventorySchema;



