// Dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("cookie-parser");

// Get All
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.render("user/index", {
            users: users,
            isAuthenticated: isAuthenticated(req),
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// GET signup page
router.get("/signup", (req, res) => {
    res.render("user/new", {
        user: new User(),
        isAuthenticated: isAuthenticated(req),
    });
});

// GET login page
router.get("/login", (req, res) => {
    res.render("user/login", {
        user: new User(),
        isAuthenticated: isAuthenticated(req),
    });
});

// POST
router.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    async (req, res, next) => {
        res.json({
            message: "Signed up successfully",
            user: req.user,
        });
    }
);

// POST login
router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error(err.message);
                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, username: user.username };
                const token = jwt.sign({ user: body }, "TOP_SECRET");
                res.cookie("access_token", token, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true,
                });

                res.redirect("/");
            });
        } catch (err) {
            return next(err.message);
        }
    })(req, res, next);
});

// POST logout
router.delete("/", (req, res) => {
    res.clearCookie("access_token");
    res.redirect("/");
});

function isAuthenticated(req) {
    let isAuthenticated;
    req.cookies["access_token"] == null
        ? (isAuthenticated = false)
        : (isAuthenticated = true);

    return isAuthenticated;
}

module.exports = router;
