const mongoose = require('mongoose');

const db = (url) =>{
    return mongoose.connect(url);
}

module.exports = { db }