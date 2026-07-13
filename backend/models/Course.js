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

	rounds: [{
		roundNumber: { type: Number },
		dates: { type: [Date], required: true }
	}],

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

	grantsAcademicLevel: {
		type: String,
		enum: ['ชำนาญการ', 'ชำนาญการพิเศษ', 'เชี่ยวชาญ', 'เชี่ยวชาญพิเศษ', null],
		default: null,
	},
	
	assessmentRounds: {
		type: [String],
		default: [],
	},

	customQuestions: [{
		key: { type: String, required: true },
		label: { type: String, required: true },
		type: {
			type: String,
			enum: ['text', 'textarea', 'number', 'date', 'radio'],
			default: 'text',
		},
		options: [String],
		required: { type: Boolean, default: false },
	}],

}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);