const { getUser } = require('../services/auth')

const checkForAuth = async ( req, res, next) =>{
    const token = req.cookies.token;

    if(!token)  {
        console.log('missing token')
        return next();
    }

    const user = getUser(token);

    if(!user) {
        console.log('cannot find user')
    }

    req.user = user;
    next();
}

const restrictTo = (roles = []) =>{
    return (req, res, next) =>{
        if(!req.user) res.redirect('/login');
        // console.log(req.user.roles)

        if(!roles.includes(req.user.role)) return res.end('Unauthorised');

        return next();
    }
}

module.exports = { checkForAuth, restrictTo }