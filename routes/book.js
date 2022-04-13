const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Edition = require("../models/edition");

router.get("/", async (req, res) => {
    res.render("book/index", { isAuthenticated: req.isAuthenticated() });
});

module.exports = router;
