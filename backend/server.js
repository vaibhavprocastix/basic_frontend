const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname);

app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get('*',(req,res) => res.sendFile(path.join(__dirname,'/frontend/build/index.html')));

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.log(err));

 const ItemSchema=new mongoose.Schema({name:String});
 const Item=mongoose.model("Item",ItemSchema);

 app.get("/api/item",async(req,res)=> {
    const items=await Item.find();
    res.json(items);
 });
 
 app.post('/api/item',async(req,res)=> {
    const newItem = new Item({name:req.body.name});
    await newItem.save();
    res.json(newItem);
 });

 const PORT=process.env.PORT || 5000;
 app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
