const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},

	image: {
		type: String,
		required: true,
	},

	dates: {
		type: [Date],
		required: true,
	},

	location: {
		type: String,
		required: true,
	},

	fullDescription: {
		type: String,
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);