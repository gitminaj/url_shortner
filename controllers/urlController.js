const shortId = require('shortid');
const URL = require("../models/url");
const shortid = require('shortid');


const generateShorUrl = async (req,res) =>{
    const body = req.body;
    const shortId = shortid.generate(9);

    if (!body.url) return res.status(400).json({
        success: false,
        error: "please provide url"
    })

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({
        success: true,
        id: shortId
    })
}

module.exports = { generateShorUrl}