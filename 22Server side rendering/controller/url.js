// controller/url.js
const shortid = require('shortid');
const URL = require('../model/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    
    const shortId = shortid.generate(); // Fixed usage
    try {
        await URL.create({
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: [],
        });
        return res.render("home",{ id: shortId });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating short URL' });
    }
}

async function handleGenerateResponse(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });
    res.redirect(entry.redirectUrl);     

}
   
async function handleGenerateAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
        res.json({ 
            redirectUrl: entry.redirectUrl,
            visitCount: entry.visitHistory.length,
            visitHistory: entry.visitHistory,
         });
}

async function handleGenerateHomePage(req, res) {
    const allUrls = await URL.find({});
    return res.render('home',{urls: allUrls,});
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGenerateResponse,
    handleGenerateAnalytics,
    handleGenerateHomePage,
};