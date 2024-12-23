const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth')

const createUser = async (req,res) =>{
    const { name, email, password } = req.body ;
    await User.create({
        name, email, password
    })

    return res.redirect("/login")
}

const userLogin = async (req,res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({email,password});
    
    console.log(user)

    if(!user){
        return res.render('login', { error: "invalid email or password"});
    }


    const token = setUser( user);
    res.cookie('token', token);


    return res.redirect('/');

}

module.exports = { createUser, userLogin }