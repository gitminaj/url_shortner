const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { checkForAuth, restrictTo  } = require('./middleware/auth')

const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');

const {db} = require('./connect');


const app = express();
const PORT = 8010;

db('mongodb://localhost:27017/short-url')

app.set("view engine", "ejs");
app.set('views', path.resolve("./view"))


app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuth);


app.use('/url', restrictTo(['NORMAL']), urlRouter);
app.use('/', staticRouter);
app.use('/user', userRouter);


app.listen(PORT, ()=>{
    console.log(`Running at port: ${PORT}`)
})



