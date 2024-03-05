const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');
const dotenv=require('dotenv');
const cors =require('cors')
const app = express();

dotenv.config()
app.use(express.json()); // for parsing application/json
app.use(cors());


app.use(bookRoutes);

app.listen(process.env.PORT, ()=>{
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('listening on port ' + process.env.PORT)
  }).catch(err=>console.log(err))
})