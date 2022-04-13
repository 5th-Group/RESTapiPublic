// Dependencies
const express = require("express");
const router = express.Router();

// GET all
router.get("/", async (req, res) => {
    let isAuthenticated;
    req.cookies["access_token"] == null
        ? (isAuthenticated = false)
        : (isAuthenticated = true);
    res.render("index", { isAuthenticated: isAuthenticated });
});

module.exports = router;
