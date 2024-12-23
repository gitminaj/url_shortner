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
        createdBy: req.user._id
    });

    return res.render( "home", {
        id: shortId
    } )

}

const urlAnalitics = async (req,res) =>{
    const shortId = req.params.shortId;
    const url = await URL.findOne({ shortId });
    if(!url){
        return res.json({
            success: false,
            message: "bad request"
        })
    }
    return res.json({
        visitHistory: url.visitHistory.length,
        urlAnalitics: url.visitHistory
    })
}

module.exports = { generateShorUrl, urlAnalitics}