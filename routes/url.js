const express = require("express");
const { generateShorUrl } = require("../controllers/urlController");

const router = express.Router();

router.post('/', generateShorUrl);

module.exports = router;



