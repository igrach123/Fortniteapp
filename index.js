//import npm modules
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const moment = require("moment");
const favicon = require("serve-favicon");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
//fire the express app
const app = express();

/* if (!config.get("jwtPrivateKey")) {
	console.error("FATAL ERROR: jwtPrivateKey is not defined.");
	process.exit(1);
} */
//import routes
const blogRoutes = require("./routes/blogRoutes");
const playerRoutes = require("./routes/playerRoutes");
const fortniteRoutes = require("./routes/fortniteRoutes");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const auth = require("./routes/auth");

// connect to mongodb & listen for requests
const dbURI =
	"mongodb+srv://gameroom:Playforfun2@cluster0.gp25g.mongodb.net/games?retryWrites=true&w=majority";

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

//deprecation warining solution
mongoose.set("useCreateIndex", true);

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //passes the post data to an url object with is withing the req
//add favicon to site
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

/* app.use(morgan('dev')); put out data */
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

//homepage redirect
app.get("/", (req, res, next) => {
	res.redirect("/players/active");
	console.log(res.cookie);
});

// importin routes from routes/blogRoutes
/* app.use(scoreRoutes); */
app.use(blogRoutes);
app.use(playerRoutes);
app.use(fortniteRoutes);
app.use(userRoutes);
app.use(reservationRoutes);
app.use(auth);

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
