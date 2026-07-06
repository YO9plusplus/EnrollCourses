const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
	token: { type: String, required: true, unique: true },
	status: {
		type: String,
		enum: ['open', 'resolved'],
		default: 'open',
	},
	messages: [{
		sender: { type: String, enum: ['user', 'admin'], required: true },
		text: String,
		image: {
			filepath: String,
			mimetype: String,
		},
		createdAt: { type: Date, default: Date.now },
	}],
	path: {
		type: String,
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);