const express = require('express');
const { handleGenerateNewShortUrl, handleGenerateResponse, handleGenerateAnalytics } = require('../controller/url');
const router = express.Router();

router.post("/", handleGenerateNewShortUrl); 

router.get("/:shortId", handleGenerateResponse);

router.get("/test/:shortId",handleGenerateAnalytics);

module.exports = router;