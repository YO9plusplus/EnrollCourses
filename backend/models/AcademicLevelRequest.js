const mongoose = require('mongoose');

const academicLevelRequestSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	registration: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
	course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
	currentLevel: String,
	requestedLevel: { type: String, required: true },
	evidenceImage: {
		filename: String,
		filepath: String,
		mimeType: String,
		size: Number,
	},
	status: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'pending',
	},
	adminNotes: String,
	reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	reviewedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('AcademicLevelRequest', academicLevelRequestSchema);