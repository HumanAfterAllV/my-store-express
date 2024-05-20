const express = require("express");
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/about', (req, res) => {
    res.send("About Us");
});

module.exports = router;