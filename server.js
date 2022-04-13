// Dependencies
require("./auth/auth");
require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const methodOverride = require("method-override");
const app = express();

// Connect to db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

// Set up middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Set up routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");

// Routing
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/books", passport.authenticate("jwt", { session: false }), bookRouter);

// Listening to port
PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
