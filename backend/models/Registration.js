const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    // Reference to User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Course Information
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    courseType: {
        type: String,
        required: false
    },

    // Previous Training (ลูกเสือ)
    hasBasicTraining: {
        type: Boolean,
        default: false
    },
    trainingType: {
        type: String,
        enum: ['สำรอง', 'สามัญ', 'สามัญรุ่นใหญ่', '']
    },
    trainingLocation: String,
    trainingDate: String,

    // Previous Training (ยุวนารี)
    hasPreviousTraining: {
        type: Boolean,
        default: false
    },
    previousTrainingCourse: String,
    previousTrainingNumber: String,
    previousTrainingLocation: String,
    previousTrainingDate: String,

    // File Uploads
    trainingEvidence: {
        filename: String,
        filepath: String,
        mimetype: String,
        size: Number
    },
    supervisorConsent: {
        filename: String,
        filepath: String,
        mimetype: String,
        size: Number,
    },
    medicalCertificate: {
        filename: String,
        filepath: String,
        mimetype: String,
        size: Number
    },

    // Agreement
    agreeToRules: {
        type: Boolean,
        required: true
    },

    // Status Management
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },

    // Admin Notes
    adminNotes: String,
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: Date,

}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);