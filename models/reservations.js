const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now,

		time: {
			type: Number,
			required: true,
			console: {
				type: Number,
				required: true,
			},
			room: {
				type: Number,
				require: true,
			},
			game: {
				type: String,
				required: false,
			},
		},
	},
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
