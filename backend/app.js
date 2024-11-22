var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const cors = require("cors");

var app = express();

// Login and Register
require("./auth/auth");
const login = require("./routes/login");
const loggedInPage = require("./routes/loggedInUser");
// ----------------------------------------------------

const bookingRoute = require("./routes/routeSelection");

var registerRouter = require("./routes/register");
//--------------------------------------------------------

try {
  mongoose.connect(
    "mongodb+srv://amritraj3jan:4d20I0yKIf9pK0cS@cluster0.wyor2ej.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "myswadeshflight" }
  );
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
}
//---------------------------------------------

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", login);
app.use("/booking", bookingRoute);
app.use("/register", registerRouter); // To register page
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
); //To Secure Route

module.exports = app;
