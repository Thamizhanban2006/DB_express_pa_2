const express = require('express');
const { resolve } = require('path');
require('dotenv').config();
const uri = process.env.uri;
const app = express();
const port = 3010;
const User = require('./schema.js')

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});



const mongoose = require('mongoose');

mongoose.connect(uri)
.then(()=>{
  console.log(`Connected to database`)
})
.catch((err)=>{
  console.log(`Error connecting to database`,err)
})

app.post('/api/users', async (req,res)=>{

try{
    const {name,email,password} = req.body;

    if(!email || !name || !password){
      return res.status(400).json({
        message:"All fields are required"
      });
    }
    const newUser = new User({name,email,password})
    await newUser.save();
    res.status(201).json({
      message:'User created successfully'
    })
}
catch(error){
  console.log('Error creating user:',error);
  res.status(500).json({message:'Server error'})
}

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});