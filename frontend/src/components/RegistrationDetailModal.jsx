import React from 'react';
import api from '../utils/api';

const RegistrationDetailModal = ({
    registration,
    isOpen,
    onClose,
    onStatusChange
}) => {
    if (!isOpen || !registration) return null;

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800'
        };

        const labels = {
            pending: 'รอดำเนินการ',
            approved: 'อนุมัติ',
            rejected: 'ไม่อนุมัติ',
            completed: 'เสร็จสิ้น'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
                {labels[status] || status}
            </span>
        );
    };

    const getCourseTitle = (courseId) => {
        return courseId === '10' ? 'ลูกเสือ' : 'ยุวกาชาด';
    };

    const handleApprove = () => {
        onStatusChange(registration._id, 'approved');
        onClose();
    };

    const handleReject = () => {
        onStatusChange(registration._id, 'rejected');
        onClose();
    };

    const handleOpenFile = async (filepath) => {
        const publicId = filepath.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '');
        const resourceType = filepath.includes('/raw/') ? 'raw' : 'image';

        const res = await api.get('/registrations/admin/signed-url', {
            params: { publicId, resourceType }
        });

        window.open(res.data.url, '_blank');
    }

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="border-b px-6 py-4 flex justify-between items-center bg-white rounded-t-lg">
                    <h2 className="text-2xl font-bold text-gray-800">รายละเอียดการสมัคร</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 space-y-6 overflow-y-auto grow">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-sm text-gray-600">สถานะ:</span>
                                <div className="mt-1">{getStatusBadge(registration.status)}</div>
                            </div>
                            <div className="text-right">
                                <span className="text-sm text-gray-600">วันที่สมัคร:</span>
                                <div className="mt-1 font-medium">
                                    {new Date(registration.createdAt).toLocaleDateString('th-TH', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ข้อมูลส่วนตัว</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-600">ชื่อ-นามสกุล:</span>
                                <p className="font-medium">{registration.user?.title} {registration.user?.firstName} {registration.user?.lastName}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">อีเมล:</span>
                                <p className="font-medium">{registration.user?.email}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">เบอร์โทรศัพท์:</span>
                                <p className="font-medium">{registration.user?.mobilePhone || '-'}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">LINE ID:</span>
                                <p className="font-medium">{registration.user?.lineId || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Work Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ข้อมูลการทำงาน</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-600">โรงเรียน/หน่วยงาน:</span>
                                <p className="font-medium">{registration.user?.school || '-'}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">ตำแหน่ง:</span>
                                <p className="font-medium">{registration.user?.position || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Documents - FIXED SECTION */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">เอกสารแนบ</h3>
                        <div className="space-y-2">
                            {[
                                { label: 'หลักฐานการฝึกอบรม', file: registration.trainingEvidence },
                                { label: 'คำยินยอมจากผู้บังคับบัญชา', file: registration.supervisorConsent },
                                { label: 'ใบรับรองแพทย์', file: registration.medicalCertificate }
                            ].map((doc, idx) => (
                                doc.file?.filepath && (
                                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
                                    <span className="text-sm text-gray-700">📄 {doc.label}</span>
                                        <button 
                                            onClick={() => handleOpenFile(doc.file.filepath)}
                                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm transition-colors"
                                        >
                                            เปิดไฟล์
                                        </button>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationDetailModal;