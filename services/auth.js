const jwt = require('jsonwebtoken');
const secret = "secret@@@"

function setUser( user){
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role 
    },secret);
}

function getUser(token){
    if(!token) return null;
    console.log(token)
    return jwt.verify(token, secret );
}

module.exports = {
    setUser,
    getUser
}