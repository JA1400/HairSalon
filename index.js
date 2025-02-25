if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const engine = require("ejs-mate");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const adminRoutes = require("./routes/admin.js");
const adminLogin = require("./routes/adminLogin.js");
const mainRoutes = require("./routes/main.js");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET || "thisshouldbeabettersecret";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.log("Error!");
    console.log(err);
  });

app.engine("ejs", engine);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  //time between resaves if data has not changed. in seconds!!
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(morgan("tiny"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allows all domains (change * to a specific origin if needed)
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/********************************************************************/

app.get("/favicon.ico", (req, res) => res.status(204));

app.use("/admin", adminRoutes);

app.use("/admin", adminLogin);

app.use("/", mainRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError(error, 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("fourOFour", { message });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
