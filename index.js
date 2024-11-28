const express = require('express');
const userRouter = require('./routes/url');
const {db} = require('./connect');

const app = express();
const PORT = 8000;

db('mongodb://localhost:27017/short-url')

app.use('/', userRouter);




app.listen(PORT, ()=>{
    console.log(`Running at port: ${PORT}`)
})



