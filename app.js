import express from 'express';
import inv_Route from './routes/inventory_Routes.js';
import mongooseConnect from './config/mongoConfig.js';
import authRoute from './routes/auth_Routes.js'
import dotenv from "dotenv"
import private_middle_ware from './middleware/privateMiddleware.js';
dotenv.config()
const app = express();
app.use(express.json())
app.use('/',inv_Route);

app.use('/auth',authRoute)

app.get('/test',(req,res)=>{
    res.send("hello testing");
})


mongooseConnect('mongodb://127.0.0.1:27017/inventory_api');

app.listen(2000);