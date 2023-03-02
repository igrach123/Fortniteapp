const express = require("express");
const moment = require("moment");
const Blog = require("../models/blog");
const Game = require("../models/blog");
const Player = require("../models/player");
const Reservation = require("../models/reservations");
const router = express.Router();
const auth = require("http-auth");
const basic = auth.basic(
	{
		realm: "Protected Area",
	},
	function (username, password, callback) {
		// Custom authentication method.
		callback(username === "gameroom" && password === "1411");
	}
);

const app = express();

router.get("/reservations", (req, res) => {
	res.locals.moment = moment;
	const id = req.params.id;
	Reservation.find()
		.then((result) => {
			res.render("reservations/index", {
				reservations: result,
				title: "Reservations",
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/reservations", (req, res) => {
	console.log(req.body);
	const reservation = new Reservation({
		date: req.body.date,
		time: req.body.time,
		console: req.body.console,
		room: req.body.room,
		game: req.body.game,
	});

	//add a embeded value!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*  player.sub.test = req.body.test; */
	reservation
		.save()
		.then((result) => {
			res.redirect("/reservations");
		})
		.catch((err) => {
			console.log(err);
		});
});

//show single player details
router.get("/reservations/:id", (req, res) => {
	//send moment js to details ejs
	res.locals.moment = moment;
	const id = req.params.id;
	Reservation.findById(id)
		.then((result) => {
			res.render("reservations/details", {
				reservation: result,
				title: "Reservation Details",
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
