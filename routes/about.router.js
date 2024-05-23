const express = require("express");

const router = express.Router();

router.get('/about', (req, res) => {
    res.send("About Us");
});

module.exports = router;