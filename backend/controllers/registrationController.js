const { cloudinary } = require('../middleware/cloudinaryUpload');
const Course = require('../models/Course');
const Registration = require('../models/Registration');
const User = require('../models/User');
const ExcelJS = require('exceljs');
const { STATIC_FIELDS } = require('../utils/exportFieldCatalog');

// @desc    Create new registration
// @route   POST /api/registrations
// @access  Private
exports.createRegistration = async (req, res) => {
    try {
        const existing = await Registration.findOne({
            user: req.user.id,
            courseId: req.body.courseId,
            status: { $ne: 'rejected' },
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'คุณได้สมัครหลักสูตรนี้ไปแล้ว'
            })
        }

        const course = await Course.findById(req.body.courseId);
        const customAnswers = (course?.customQuestions || [])
            .map(q => ({
                key: q.key,
                label: q.label,
                value: req.body[`custom_${q.key}`] ?? ''
            }))
            .filter(a => a.value !== '');

        const registrationData = new Registration({
            user: req.user.id,
            courseId: req.body.courseId,
            courseType: req.body.courseType,
            agreeToRules: req.body.agreeToRules === 'true',
            customAnswers,

            // Previous training (Scout)
            hasBasicTraining: req.body.hasBasicTraining === 'true',
            trainingType: req.body.trainingType,
            trainingLocation: req.body.trainingLocation,
            trainingDate: req.body.trainingDate,
            
            // Previous training (Red Cross)
            hasPreviousTraining: req.body.hasPreviousTraining === 'true',
            previousTrainingCourse: req.body.previousTrainingCourse,
            previousTrainingNumber: req.body.previousTrainingNumber,
            previousTrainingLocation: req.body.previousTrainingLocation,
            previousTrainingDate: req.body.previousTrainingDate,

            // เลื่อนวิทยฐานะ
            yearsOfService: req.body.yearsOfService ? Number(req.body.yearsOfService) : null,
            department: req.body.department,
            positionAppointedDate: req.body.positionAppointedDate,
            academicLevelAppointedDate: req.body.academicLevelAppointedDate,
            currentPositionSchoolDate: req.body.currentPositionSchoolDate,
            careerTrack: req.body.careerTrack,
            developmentCase: req.body.developmentCase,
            developmentCaseCertDate: req.body.developmentCaseCertDate,
            developmentCaseCertCount: req.body.developmentCaseCertCount ? Number(req.body.developmentCaseCertCount) : null,
            previousTrainingCount: req.body.previousTrainingCount ? Number(req.body.previousTrainingCount) : null,
            academicWorkCount: req.body.academicWorkCount ? Number(req.body.academicWorkCount) : null,
            expectedAcademicWorkArea: req.body.expectedAcademicWorkArea,
        });

        // Handle file uploads
        if (req.files) {
            if (req.files.trainingEvidence) {
                const file = req.files.trainingEvidence[0];
                registrationData.trainingEvidence = {
                    filename: file.originalname,
                    filepath: file.path,
                    mimetype: file.mimetype,
                    size: file.size
                };
            }
            
            if (req.files.supervisorConsent) {
                const file = req.files.supervisorConsent[0];
                registrationData.supervisorConsent = {
                    filename: file.originalname,
                    filepath: file.path,
                    mimetype: file.mimetype,
                    size: file.size
                };
            }
                
            if (req.files.medicalCertificate) {
                const file = req.files.medicalCertificate[0]
                registrationData.medicalCertificate = {
                    filename: file.originalname,
                    filepath: file.path,
                    mimetype: file.mimetype,
                    size: file.size
                };
            }
            
            if (req.files.applicationForm) {
                const file = req.files.applicationForm[0];
                registrationData.applicationForm = {
                    filename: file.originalname,
                    filepath: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                };
            }
        }


        await registrationData.save();

        res.status(201).json({
            success: true,
            message: 'Registration submitted successfully',
            registration: registrationData,
        });
    } catch(err) {
        console.error('Create registration error: ', err);
        res.status(500).json({
            success: false,
            message: 'Failed to submit registration',
            error: err.message
        });
    }
};

// @desc    Get user's own registrations
// @route   GET /api/registrations/my-registrations
// @access  Private
exports.getMyRegistrations = async (req, res) => {
    try {
        const AcademicLevelRequest = require('../models/AcademicLevelRequest');

        const registrations = await Registration.find({ user: req.user.id })
            .populate('courseId', 'title formType grantsAcademicLevel')
            .sort({ createdAt: -1 });

        const levelRequests = await AcademicLevelRequest.find({ user: req.user.id });

        const registrationsWithStatus = registrations.map(reg => {
            const obj = reg.toObject();
            const match = levelRequests.find(r => r.registration.toString() === reg._id.toString());
            obj.academicLevelRequestStatus = match ? match.status : null;
            return obj;
        });
        
            res.json({
                success: true,
                count: registrationsWithStatus.length,
                registrations: registrationsWithStatus
            });
    } catch(err) {
        console.error('Get my registrations error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to get registrations'
        });
    }
};

// @desc    Get all registrations (Admin)
// @route   GET /api/registrations/admin/all
// @access  Private/Admin
exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate('user', '-password')
            .populate('courseId', 'title formType')
            .populate('reviewedBy', 'firstName lastName')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: registrations.length,
            registrations
        });
    } catch(err) {
        console.error('Get all registrations error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to get registrations'
        });
    }
};

// @desc    Get registrations by course (Admin)
// @route   GET /api/registrations/admin/course/:courseId
// @access  Private/Admin
exports.getRegistrationsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const registrations = await Registration.find({ courseId })
            .populate('user', '-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: registrations.length,
            registrations
        });
    } catch(error) {
        console.error('Get registrations by course error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get registrations'
        })
    }
}

// @desc    Get registrations by status (Admin)
// @route   GET /api/registrations/admin/status/:status
// @access  Private/Admin
exports.getRegistrationsByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const registrations = await Registration.find({ status })
            .populate('user', '-password')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: registrations.length,
            registrations
        });
    } catch (error) {
        console.error('Get registrations by status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get registrations'
        });
    }
};

// @desc    Update registration status (Admin)
// @route   PUT /api/registrations/admin/:id/status
// @access  Private/Admin
exports.updateRegistrationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const oldReg = await Registration.findById(req.params.id);
        const course = await Course.findById(oldReg.courseId);
        if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

        const wasApproved = oldReg.status === 'approved';
        const willBeApprove = status === 'approved';
        const wasApprovedNowNot = wasApproved && status !== 'approved';

        if (!wasApproved && willBeApprove) {
            course.enrolledCount += 1;
        } else if (wasApprovedNowNot) {
            course.enrolledCount -= 1;
        }

        if (course.capacity !== null && course.enrolledCount >= course.capacity) {
            course.status = 'full';
        } else if (course.status === 'full' && course.capacity !== null && course.enrolledCount < course.capacity) {
            course.status = 'open';
        }
        await course.save();

        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            {
                status,
                reviewedBy: req.user.id,
                reviewedAt: Date.now()
            },
            { new: true }
        ).populate('user', '-password');

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        res.json({
            success: true,
            message: 'Status updated successfully',
            registration
        });
    } catch(error) {
        console.error('Update status error: ', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update status'
        });
    }
};

// @desc    Update admin notes (Admin)
// @route   PUT /api/registrations/admin/:id/notes
// @access  Private/Admin
exports.updateAdminNotes = async (req, res) => {
    try {
        const { adminNotes } = req.body;

        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { adminNotes },
            { new: true }
        ).populate('user', '-password');

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        res.json({
            success: true,
            message: 'Notes updates successfully'
        });
    } catch(error) {
        console.error('Update notes error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update notes'
        });
    }
};

exports.getExportFields = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        const fields = [
            ...STATIC_FIELDS
                .filter(f => !f.formType || f.formType === course?.formType)
                .map(f => ({ key: f.key, label: f.label, group: f.group })),
            ...(course?.customQuestions || []).map(q => ({
                key: `custom_${q.key}`,
                label: q.label,
                group: 'คำถามเพิ่มเติม'
            })),
        ];
        res.json({ success: true, fields });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get export fields' });
    }
};

// @desc    Export registrations to Excel (Admin)
// @route   GET /api/registrations/admin/export/:courseId
// @access  Private/Admin
exports.exportToExcel = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { courseType, fields } = req.query;

        const course = await Course.findById(courseId);

        const filter = { courseId };
        if (courseType) filter.courseType = courseType;

        const registrations = await Registration.find(filter)
            .populate('user', '-password')
            .sort({ createdAt: -1 });

        const allFields = [
            ...STATIC_FIELDS.filter(f => !f.formType || f.formType === course?.formType),
            ...(course?.customQuestions || []).map(q => ({
                key: `custom_${q.key}`,
                label: q.label,
                get: (reg) => reg.customAnswers?.find(a => a.key === q.key)?.value || ''
            })),
        ];

        const selectedKeys = fields ? fields.split(',') : null;
        const activeFields = selectedKeys
            ? allFields.filter(f => selectedKeys.includes(f.key))
            : allFields;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Registrations');

        worksheet.columns = [
            { header: 'ลำดับ', key: 'no', width: 10 },
            ...activeFields.map(f => ({ header: f.label, key: f.key, width: 25 }))
        ];

        registrations.forEach((reg, idx) => {
            const row = { no: idx + 1 };
            activeFields.forEach(f => { row[f.key] = f.get(reg); });
            worksheet.addRow(row);
        });

        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2d6e5e' }
        };

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=registrations-${courseId}-${Date.now()}.xlsx`
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch(error) {
        console.error('Export error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export data'
        });
    }
};

// @desc    Get registration by ID
// @route   GET /api/registrations/:id
// @access  Private
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('user', '-password')
      .populate('reviewedBy', 'firstName lastName');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Check if user owns this registration or is admin
    if (registration.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this registration'
      });
    }

    res.json({
      success: true,
      registration
    });
  } catch (error) {
    console.error('Get registration by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get registration'
    });
  }
};

exports.getSignedUrl = async (req, res) => {
    try {
        const { publicId, resourceType = 'image' } = req.query;

        const signedUrl = cloudinary.url(publicId, {
            secure: true,
            sign_url: true,
            expires_at: Math.floor(Date.now() / 1000) + 300,
            resource_type: resourceType
        });

        res.json({ success: true, url: signedUrl });
    } catch(err) {
        res.status(500).json({ success: false, message: 'Failed to generate signed URL'});
    }
}

exports.getRegistrationsGroupedByUser = async (req, res) => {
    try {
        const result = await Registration.aggregate([
            { $match: { status: 'approved' } },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'courseId',
                    foreignField: '_id',
                    as: 'course'
                }
            },
            { $unwind: '$course' },
        {
            $group: {
                _id: '$user',
                courseCount: { $sum: 1 },
                courses: {
                    $push: {
                        _id: '$course._id',
                        title: '$course.title'
                    }
                }
            }
        },
        { $sort: { courseCount: -1 } },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: '$user' },
        {
            $project: {
                _id: 0,
                userId: '$user._id',
                firstName: '$user.firstName',
                lastName: '$user.lastName',
                email: '$user.email',
                school: '$user.school',
                courseCount: 1,
                courses: 1
            }
        }
        ]);

        res.json({
            success: true,
            count: result.length,
            users: result
        });
    } catch(error) {
        console.error('Get registrations grouped by user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get data'
        });
    }
};