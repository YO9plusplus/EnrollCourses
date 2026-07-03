import { useEffect, useState } from "react";
import api from '../utils/api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSubCourseLabel } from "../config/fixedSubCourses";

const statusConfig = {
	pending: { label: 'รอการพิจารณา', color: 'bg-yellow-100 text-yellow-800'},
	approved: { label: 'อนุมัติแล้ว', color: 'bg-green-100 text-green-800'},
	rejected: { label: 'ไม่ผ่านการพิจารณา', color: 'bg-red-100 text-red-800'},
	completed: { label: 'เสร็จสิ้น', color: 'bg-blue-100 text-blue-800'},
};

export default function MyRegistrationPage() {
	const [registrations, setRegistrations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const [requestingFor, setRequestingFor] = useState(null);
    const [evidenceFile, setEvidenceFile] = useState(null);

	useEffect(() => {
		const fetchRegistrations = async () => {
			try {
				const res = await api.get('/registrations/my-registration');
				setRegistrations(res.data.registrations);
			} catch(err) {
				setError('ไม่สามารถโหลดข้อมูลได้');
			} finally {
				setLoading(false);
			}
		};
		fetchRegistrations();
	}, []);

    const handleRequestLevel = async (registrationId) => {
        if (!evidenceFile) {
            alert('กรุณาแนบรูปภาพหลักฐานก่อน');
		    return;
        }
        try {
            const formData = new FormData();
            formData.append('registrationId', registrationId);
            formData.append('evidenceImage', evidenceFile);

            await api.post('/academic-level-requests', { registrationId });
            alert('ส่งคำขอปรับวิทยฐานะสำเร็จ รอการอนุมัติจากผู้ดูแล');
            setRequestingFor(null);
            setEvidenceFile(null);
            const res = await api.get('/registrations/my-registration');
            setRegistrations(res.data.registrations);
        } catch(err) {
            alert('เกิดข้อผิดพลาด: ' + (err.response?.data?.message || 'ไม่สามารถส่งคำขอได้'));
        }
    }

	if (loading) return <div>กำลังโหลด...</div>;
	if (error) return <div>{error}</div>

	return (
        <div className="min-h-screen bg-[#2d6e5e]">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    การสมัครของฉัน
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center text-white py-12">
                        <div className="text-5xl mb-4">⏳</div>
                        <p>กำลังโหลดข้อมูล...</p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
                        <p className="text-lg">{error}</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && registrations.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow">
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            ยังไม่มีการสมัครหลักสูตร
                        </h2>
                        <p className="text-gray-500 mb-6">
                            คุณยังไม่ได้สมัครหลักสูตรใดเลย
                        </p>
                        <Link
                            to="/"
                            className="bg-[#2d6e5e] text-white px-6 py-2 rounded-lg hover:bg-[#1f5045] transition-colors duration-200"
                        >
                            ดูหลักสูตรทั้งหมด
                        </Link>
                    </div>
                )}

                {/* Registration Cards */}
                {!loading && !error && registrations.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {registrations.map((reg) => {
                            const { label, color } = statusConfig[reg.status] ?? statusConfig.pending;
                            return (
                                <div
                                    key={reg._id}
                                    className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                >
                                    {/* Course Info */}
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-[#2d6e5e] mb-1">
                                            {reg.courseId?.title ?? reg.courseType}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {getSubCourseLabel(reg.courseType)}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            สมัครเมื่อ: {new Date(reg.createdAt).toLocaleDateString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        {/* Admin Notes */}
                                        {reg.adminNotes && (
                                            <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
                                                <span className="font-medium">หมายเหตุจากผู้ดูแล:</span> {reg.adminNotes}
                                            </div>
                                        )}
                                    </div>

                                    {reg.status === 'completed' && reg.courseId?.grantsAcademicLevel && (
                                        <div className="mt-3">
                                            {!reg.academicLevelRequestStatus && (
                                                requestingFor === reg._id ? (
                                                    <div className="flex flex-col gap-2">
                                                        <input
                                                            type="file"
                                                            accept=".jpg,.jpeg,.png"
                                                            onChange={e => setEvidenceFile(e.target.files[0] || null)}
                                                            className="text-sm"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleRequestLevel(reg._id)}
                                                                disabled={!evidenceFile}
                                                                className="text-sm bg-[#2d6e5e] text-white px-4 py-1.5 rounded-lg hover:bg-[#1f5045] disabled:opacity-50 cursor-pointer"
                                                            >
                                                                ยืนยันส่งคำขอ
                                                            </button>
                                                            <button
                                                                onClick={() => { setRequestingFor(null); setEvidenceFile(null); }}
                                                                className="text-sm text-gray-500 hover:underline cursor-pointer"
                                                            >
                                                                ยกเลิก
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setRequestingFor(reg._id)}
                                                        className="text-sm bg-[#2d6e5e] text-white px-4 py-1.5 rounded-lg hover:bg-[#1f5045] transition-colors cursor-pointer"
                                                    >
                                                        ขอปรับวิทยฐานะเป็น {reg.courseId.grantsAcademicLevel}
                                                    </button>
                                                )
                                            )}
                                            {reg.academicLevelRequestStatus === 'pending' && (
                                                <span className="text-sm text-yellow-700">⏳ รอการอนุมัติปรับวิทยฐานะเป็น {reg.courseId.grantsAcademicLevel}</span>
                                            )}
                                            {reg.academicLevelRequestStatus === 'approved' && (
                                                <span className="text-sm text-green-700">✓ อนุมัติปรับวิทยฐานะเป็น {reg.courseId.grantsAcademicLevel} แล้ว</span>
                                            )}
                                            {reg.academicLevelRequestStatus === 'rejected' && (
                                                <span className="text-sm text-red-700">คำขอปรับวิทยฐานะถูกปฏิเสธ</span>
                                            )}
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className="flex-shrink-0">
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${color}`}>
                                            {label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}