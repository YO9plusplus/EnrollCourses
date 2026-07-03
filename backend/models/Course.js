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
		enum: ['open', 'full', 'closed'],
		default: 'open'
	},

	capacity: {
		type: Number,
		default: null,
	},
	enrolledCount: {
		type: Number,
		default: 0
	},

	subCourses: [{
		value: { type: String, required: true },
		label: { type: String, required: true },
		duration: { type: String },
		requirement: { type: String },
		dates: [Date],
	}],

	formType: {
		type: String,
		default: null,
	},

}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);