const express = require("express");
const { generateShorUrl, urlAnalitics } = require("../controllers/urlController");
const URL = require("../models/url")

const router = express.Router();

router.post('/', generateShorUrl);

// router.get('/route/:shortId', async (req, res) =>{

//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId
//     },{
//         $push:{
//             visitHistory: {
//                 timestamp: Date.now(),
//             },
//         },
//     });
//     // res.json(entry)

//     res.redirect(entry.redirectUrl)
// });


router.get('/route/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate({
            shortId
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
            // Optionally, if you want to return the updated document
            // new: true
        });

        if (!entry) {
            // Handle the case when no document is found
            console.log(`No URL entry found for shortId: ${shortId}`);
            res.status(404).send(`URL not found for shortId: ${shortId}`);
            return;
        }

        if (!entry.redirectUrl) {
            // Handle the case when redirectUrl is missing (though this would be undefined, not null)
            console.log(`redirectUrl missing for shortId: ${shortId}`);
            res.status(500).send('Internal Server Error: redirectUrl missing.');
            return;
        }

        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error('Error handling URL redirect:', error);
        res.status(500).send('Internal Server Error: Unable to process request.');
    }
});




router.get('/test', async (req, res)=>{
    const allUrls = await URL.find({});
    console.log(allUrls)
    return res.render('home', {
        urls: allUrls
    })
})

router.get('/analytics/:shortId', urlAnalitics )

module.exports = router;



