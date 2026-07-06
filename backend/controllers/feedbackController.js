const Feedback = require("../models/Feedback");
const crypto = require('crypto');

const DEVELOPER_EMAIL = 'dev@dev.com';
const buildImagePayload = (file) => file ? { filepath: file.path, mimetype: file.mimetype }: undefined;

exports.createFeedback = async (req, res) => {
	try{
		const { message, path } = req.body;
		if (!message?.trim() && !req.file) {
			return res.status(400).json({ success: false, message: 'กรุณากรอกข้อความหรือแนบรูป' });
		}

		const token = crypto.randomBytes(16).toString('hex');

		const feedback = await Feedback.create({
			token,
			path,
			messages: [{
				sender: 'user',
				text: message,
				image: buildImagePayload(req.file),
			}],
		});
		res.status(201).json({ success: true, token, feedback });
	} catch(err) {
		console.error('Create feedback error:', err);
		res.status(500).json({ success: false, message: 'ไม่สามารถส่ง feedback ได้' });
	}
};

exports.getThreadByToken = async (req, res) => {
	try {
		const feedback = await Feedback.findOne({ token: req.params.token });
		if (!feedback) {
			return res.status(404).json({ success: false, message: 'ไม่พบข้อมูล' });
		}
		res.json({ success: true, feedback });
	} catch(err) {
		res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด' })
	}
};

exports.addUserMessage = async (req, res) => {
	try {
		const feedback = await Feedback.findOne({ token: req.params.token });
		if (!feedback) {
			return res.status(404).json({ success: false, message: 'ไม่พบข้อมูล' });
		}

		feedback.messages.push({
			sender: 'user',
			text: req.body.message,
			image: buildImagePayload(req.file),
		});
		await feedback.save();

		res.json({ success: true, feedback });
	} catch(err) {
		console.error('Add user message error:', err);
        res.status(500).json({ success: false, message: 'ไม่สามารถส่งข้อความได้' });
	}
};

// DEV PART
exports.getAllThreads = async (req, res) => {
	try {
		if (req.user.email !== DEVELOPER_EMAIL) {
			return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง' });
		} 

		const feedbacks = await Feedback.find().sort({ updatedAt: -1 });
		res.json({ success: true, feedbacks });
	} catch(err) {
		console.log(err);
		res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด' });
	}
}; 

exports.addAdminMessage = async (req, res) => {
	try {
		if (req.user.email !== DEVELOPER_EMAIL) {
			return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง' });
		} 

		const feedback = await Feedback.findById(req.params.id);
		if (!feedback) {
			return res.status(404).json({ success: false, message: 'ไม่พบข้อมูล'});
		}

		feedback.messages.push({
			sender: 'admin',
			text: req.body.message,
			image: buildImagePayload(req.file),
		});
		await feedback.save();
		res.json({ success: true, feedback });
	} catch(err) {
		console.error('Add admin message error:', err);
        res.status(500).json({ success: false, message: 'ไม่สามารถส่งข้อความได้'});
	}
};