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

	status: {
		type: String,
		enum: ['upcoming', 'open', 'full', 'closed'],
		default: 'upcoming'
	},

	capacity: {
		type: Number,
		default: null,
	},
	enrolledCount: {
		type: Number,
		default: 0
	},

	courseKey: {
		type: String,
		enum: ['scout', 'redcross'],
		default: null,
		sparse: true,
	},
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);