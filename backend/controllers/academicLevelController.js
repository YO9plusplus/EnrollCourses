const User = require('../models/User');
const AcademicLevelRequest = require("../models/AcademicLevelRequest");
const Registration = require("../models/Registration");

exports.createRequest = async (req, res) => {
	try {
		const { registrationId } = req.body;
		
		const registration = await Registration.findById(registrationId).populate('courseId');
		if (!registration || registration.user.toString() !== req.user.id) {
			return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลการสมัคร' });
		}

		if (registration.status !== 'completed') {
			return res.status(400).json({ success: false, message: 'หลักสูตรนี้ยังไม่เสร็จสิ้น' });
		}

		const course = registration.courseId;
		if (!course?.grantsAcademicLevel) {
			return res.status(404).json({ success: false, message: 'หลักสูตรนี้ไม่สามารถขอปรับวิทยฐานะได้' });
		}

		const existing = await AcademicLevelRequest.findOne({ registration: registrationId });
		if (existing) {
			return res.status(400).json({ success: false, message: 'คุณได้ขอปรับวิทยฐานาะสำหรับการสมัครนี้ไปแล้ว' });
		}

		if (!req.file) {
			return res.status(400).json({ success: false, message: 'กรุณาแนบรูปภาพหลักฐาน' });
		}

		const user = await User.findById(req.user.id);

		const request = await AcademicLevelRequest.create({
			user: req.user.id,
			registration: registrationId,
			course: course._id,
			currentLevel: user.academicLevel,
			requestedLevel: course.grantsAcademicLevel,
			evidenceImage: {
				filename: req.file.originalname,
				filepath: req.file.path,
				mimetype: req.file.mimetype,
				size: req.file.size,
			}
		});

		res.status(201).json({ success: true, message: 'ส่งคำขอปรับวิทยฐานะสำเร็จรอการอนุมัติจากผู้ดูแล', request });
	} catch(err) {
		console.error('Create academic level request error:', err);
		res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด' });
	}
};

exports.getAllRequests = async (req, res) => {
	try {
		const requests = await AcademicLevelRequest.find()
			.populate('user', 'firstName lastName email academicLevel')
			.populate('course', 'title')
			.sort({ createdAt: -1 });

		res.json({ success: true, count: requests.length, requests });
	} catch(err) {
		res.status(500).json({ success: false, message: 'Failed to get requests' });
	}
};

exports.reviewRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const { status, adminNotes } = req.body;

		if (!['approved', 'rejected'].includes(status)) {
			return res.status(400).json({ success: false, message: 'สถานะไม่ถูกต้อง' });
		}

		const request = await AcademicLevelRequest.findById(id);
		if (!request) {
			return res.status(404).json({ success: false, messgae: 'ไม่พบคำขอ' });
		}

		request.status = status;
		request.adminNotes = adminNotes;
		request.reviewedBy = req.user.id;
		request.reviewedAt = new Date();
		await request.save();

		if (status === 'approved') {
			await User.findByIdAndUpdate(request.user, { academicLevel: request.requestedLevel });
		}
		res.json({ success: true, message: 'อัปเดตสถานะคำขอสำเร็จ', request });
	} catch(err) {
		console.error('Review academic level request error:', err);
		res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด' });
	}
};