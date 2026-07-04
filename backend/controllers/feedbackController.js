const Feedback = require("../models/Feedback");

exports.sentFeedback = async (req, res) => {
	try{
		const feedbackData = new Feedback({
			message: req.body.message,
			path: req.body.path ,
		}) ;
		await feedbackData.save();
		res.status(201).json({ success: true, message: 'Feedback successfully sent.'});
	} catch(err) {
		res.status(500).json({ success: false, message: 'Failed to sent feedback' });
	}
}