const express = require('express');
const { handleGenerateNewShortUrl, handleGenerateResponse,  handleGetUrlLink } = require('../controller/url');
const router = express.Router();

router.post("/", handleGenerateNewShortUrl); 

router.get("/:shortId", handleGenerateResponse);

router.get("/get/:shortId",  handleGetUrlLink);

module.exports = router;