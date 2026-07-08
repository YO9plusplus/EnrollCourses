import React from 'react';
import api from '../utils/api';
import { calculateAge } from '../utils/age';
import { getSubCourseLabel } from '../config/fixedSubCourses';

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

    const handleOpenFile = async (filepath) => {
        const publicId = filepath.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '');
        const resourceType = filepath.includes('/raw/') ? 'raw' : 'image';

        const res = await api.get('/registrations/admin/signed-url', {
            params: { publicId, resourceType }
        });

        window.open(res.data.url, '_blank');
    }

    const formType = registration.courseId?.formType;
    const user = registration.user || {};

    const Field = ({ label, value }) => (
        <div>
            <span className="text-sm text-gray-600">{label}:</span>
            <p className="font-medium">{value || '-'}</p>
        </div>
    );

    const files = [
        { label: 'หลักฐานการฝึกอบรม', file: registration.trainingEvidence },
        { label: 'คำยินยอมจากผู้บังคับบัญชา', file: registration.supervisorConsent },
        { label: 'ใบรับรองแพทย์', file: registration.medicalCertificate },
        { label: 'ใบสมัคร (ลงชื่อแล้ว)', file: registration.applicationForm },
    ].filter(doc => doc.file?.filepath);

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

                    {/* Course Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">หลักสูตรที่สมัคร</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="ชื่อหลักสูตร" value={registration.courseId?.title} />
                            {registration.courseType && (
                                <Field label="หลักสูตรย่อย/ตัวเลือก" value={getSubCourseLabel(registration.courseType)} />
                            )}
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ข้อมูลส่วนตัว</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="ชื่อ-นามสกุล" value={`${user.title || ''} ${user.firstName || ''} ${user.lastName || ''}`.trim()} />
                            <Field label="อีเมล" value={user.email} />
                            <Field label="เบอร์โทรศัพท์" value={user.mobilePhone} />
                            <Field label="LINE ID" value={user.lineId} />
                            <Field label="อายุ" value={user.birthDate ? `${calculateAge(user.birthDate)} ปี` : null} />
                            <Field label="ศาสนา" value={user.religion} />
                            <Field label="วุฒิการศึกษา" value={user.education} />
                            <Field label="วิชาเอก" value={user.major} />
                        </div>
                    </div>

                    {/* Work Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ข้อมูลการทำงาน</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="โรงเรียน/หน่วยงาน" value={user.school} />
                            <Field label="เขต" value={user.district} />
                            <Field label="ตำแหน่ง" value={user.position} />
                            <Field label="วิทยฐานะปัจจุบัน" value={user.academicLevel} />
                        </div>
                    </div>

                    {/* Health */}
                    {(user.healthCondition || user.foodRestrictions) && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">สุขภาพและอาหาร</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="โรคประจำตัว" value={user.healthCondition} />
                                <Field label="อาหารที่ไม่รับประทาน/แพ้" value={user.foodRestrictions} />
                            </div>
                        </div>
                    )}

                    {/* Scout-specific */}
                    {formType === 'scout' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ประสบการณ์การฝึกอบรม (ลูกเสือ)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="เคยผ่านการฝึกอบรม B.T.C." value={registration.hasBasicTraining ? 'เคย' : 'ไม่เคย'} />
                                {registration.hasBasicTraining && (
                                    <>
                                        <Field label="ประเภท" value={registration.trainingType} />
                                        <Field label="สถานที่ฝึกอบรม" value={registration.trainingLocation} />
                                        <Field label="ระหว่างวันที่" value={registration.trainingDate} />
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Redcross-specific */}
                    {formType === 'redcross' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ประสบการณ์การฝึกอบรม (ยุวกาชาด)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="เคยผ่านการฝึกอบรมมาก่อน" value={registration.hasPreviousTraining ? 'เคย' : 'ไม่เคย'} />
                                {registration.hasPreviousTraining && (
                                    <>
                                        <Field label="หลักสูตรที่ผ่านมา" value={getSubCourseLabel(registration.previousTrainingCourse)} />
                                        <Field label="เลขที่รุ่น" value={registration.previousTrainingNumber} />
                                        <Field label="สถานที่ฝึกอบรม" value={registration.previousTrainingLocation} />
                                        <Field label="ระหว่างวันที่" value={registration.previousTrainingDate} />
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Academic Promotion-specific */}
                    {formType === 'academicPromotion' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ข้อมูลการรับราชการ (เลื่อนวิทยฐานะ)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="อายุราชการ" value={registration.yearsOfService ? `${registration.yearsOfService} ปี` : null} />
                                <Field label="สังกัด" value={registration.department} />
                                <Field label="วันที่แต่งตั้งตำแหน่งปัจจุบัน" value={registration.positionAppointedDate} />
                                <Field label="วันที่แต่งตั้งวิทยฐานะปัจจุบัน" value={registration.academicLevelAppointedDate} />
                                <Field label="วันที่รับราชการในตำแหน่ง/สถานศึกษาปัจจุบัน" value={registration.currentPositionSchoolDate} />
                                <Field label="สายงานที่ขอเข้ารับการพัฒนา" value={registration.careerTrack} />
                                <Field label="กรณีที่ขอเข้ารับการพัฒนา" value={registration.developmentCase} />
                                {registration.developmentCase === 'วุฒิบัตรการพัฒนาครบ 5 ปี' && (
                                    <>
                                        <Field label="วันที่ได้วุฒิบัตร" value={registration.developmentCaseCertDate} />
                                        <Field label="จำนวนครั้ง" value={registration.developmentCaseCertCount} />
                                    </>
                                )}
                                <Field label="เคยเข้ารับการฝึกอบรมโครงการฯ วิทยฐานะ (ครั้ง)" value={registration.previousTrainingCount} />
                                <Field label="เคยส่งผลงานทางวิชาการ (ครั้ง)" value={registration.academicWorkCount} />
                                <Field label="คาดว่าจะส่งผลงานด้านที่ 3 (กลุ่มสาระ)" value={registration.expectedAcademicWorkArea} />
                                <Field label="รอบที่ยื่นขอประเมิน (วก.1)" value={registration.assessmentRound} />
                            </div>
                        </div>
                    )}

                    {/* Custom Questions (per-course, dynamic) */}
                    {registration.customAnswers?.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">คำถามเพิ่มเติม</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {registration.customAnswers.map((a, i) => (
                                    <Field key={i} label={a.label || a.key} value={a.value} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Documents */}
                    {files.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">เอกสารแนบ</h3>
                            <div className="space-y-2">
                                {files.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
                                        <span className="text-sm text-gray-700">📄 {doc.label}</span>
                                        <button 
                                            onClick={() => handleOpenFile(doc.file.filepath)}
                                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm transition-colors"
                                        >
                                            เปิดไฟล์
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Admin Notes */}
                    {registration.adminNotes && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">หมายเหตุจากแอดมิน</h3>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{registration.adminNotes}</p>
                        </div>
                    )}
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