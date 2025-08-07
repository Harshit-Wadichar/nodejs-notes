const express = require('express');
const URL = require('../model/url');
const {handleGenerateHomePage} = require('../controller/url');
const router = express.Router();

router.get("/",handleGenerateHomePage);

module.exports = router;