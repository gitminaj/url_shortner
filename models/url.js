const mongoose = require("mongoose");


const urlSchema = mongoose.Schema(
{
    shortId:{
        type: String,
        unique: true,
        required: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp:  Number }],
},
 {timestamps: true}

)

const URL = mongoose.model('urls', urlSchema);

module.exports = URL;