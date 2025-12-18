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
        type: String,
        required: true,
        enum: ['10', '11']
    },
    courseType: {
        type: String,
        required: true
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
    reviewdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewdAt: Date,

    // Timestamps
    submittedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

registrationSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Registration', registrationSchema);