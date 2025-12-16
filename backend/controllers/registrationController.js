const Registration = require('../models/Registration');
const User = require('../models/User');
const ExcelJS = require('exceljs');

// @desc    Create new registration
// @route   POST /api/registrations
// @access  Private
exports.createRegistration = async (req, res) => {
    try {
        const registration = new Registration({
            user: req.user.id,
            ...req.body
        });

        await registration.save();

        res.status(201).json({
            success: true,
            message: 'Registration submitted successfully',
            registration
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
        const registrations = await Registration.find({ user: req.user.id })
            .sort({ submittedAt: -1 });
        
            res.json({
                success: true,
                count: registrations.length,
                registrations
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
            .populate('reviewdBy', 'firstName lastName')
            .sort({ submittedAt: -1 });

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
            .sort({ submittedAt: -1 });

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
            .sort({ submittedAt: -1 });
        
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

        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            {
                status,
                reviewdBy: req.user.id,
                reviewdAt: Date.now()
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

// @desc    Export registrations to Excel (Admin)
// @route   GET /api/registrations/admin/export/:courseId
// @access  Private/Admin
exports.exportToExcel = async (req, res) => {
    try {
        const { courseId } = req.params;

        const registrations = await Registration.find({ courseId })
            .populate('user', '-password')
            .sort({ submittedAt: -1 });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Registrations');

        // Headers
        worksheet.columns = [
            { header: 'ลำดับ', key: 'no', width: 10 },
            { header: 'วันที่สมัคร', key: 'date', width: 15 },
            { header: 'คำนำหน้า', key: 'title', width: 10 },
            { header: 'ชื่อ', key: 'firstName', width: 20 },
            { header: 'นามสกุล', key: 'lastName', width: 20 },
            { header: 'อีเมล', key: 'email', width: 30 },
            { header: 'เบอร์โทร', key: 'phone', width: 15 },
            { header: 'LINE ID', key: 'lineId', width: 15 },
            { header: 'โรงเรียน', key: 'school', width: 30 },
            { header: 'เขต', key: 'district', width: 20 },
            { header: 'ตำแหน่ง', key: 'position', width: 15 },
            { header: 'วิทยฐานะ', key: 'academicLevel', width: 20 },
            { header: 'หลักสูตรที่สมัคร', key: 'courseType', width: 50 },
            { header: 'สถานะ', key: 'status', width: 15 }
        ];

        // Add data
        registrations.forEach((reg, index) => {
            worksheet.addRow({
                no: index + 1,
                date: new Date(reg.submittedAt).toLocaleDateString('th-TH'),
                title: reg.user.title,
                firstName: reg.user.firstName,
                lastName: reg.user.lastName,
                email: reg.user.email,
                phone: reg.user.mobilePhone,
                lineId: reg.user.lineId,
                school: reg.user.school,
                district: reg.user.district,
                position: reg.user.position,
                academicLevel: reg.user.academicLevel,
                courseType: reg.courseType,
                status: reg.status
            });
        });

        // Style header
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2d6e5e' }
        };

        // Set response headers
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