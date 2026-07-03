import { useEffect, useState } from 'react';
import api from '../utils/api';

const statusConfig = {
    pending: { label: 'รอดำเนินการ', color: 'bg-yellow-100 text-yellow-800' },
    approved: { label: 'อนุมัติ', color: 'bg-green-100 text-green-800' },
    rejected: { label: 'ไม่อนุมัติ', color: 'bg-red-100 text-red-800' },
};

const AcademicLevelRequestsPanel = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/academic-level-requests/admin/all');
            setRequests(res.data.requests);
        } catch (err) {
            console.error('Failed to load academic level requests', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleReview = async (id, status) => {
        try {
            await api.put(`/academic-level-requests/admin/${id}/status`, { status });
            fetchRequests();
        } catch (err) {
            alert('เกิดข้อผิดพลาด: ' + (err.response?.data?.message || 'ไม่สามารถอัปเดตได้'));
        }
    };

    if (loading || requests.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">คำขอปรับวิทยฐานะ</h3>
            <div className="space-y-3">
                {requests.map(r => {
                    const { label, color } = statusConfig[r.status];
                    return (
                        <div key={r._id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">{r.user?.firstName} {r.user?.lastName}</p>
                                <p className="text-sm text-gray-500">
                                    {r.course?.title} — {r.currentLevel || 'ไม่ระบุ'} → {r.requestedLevel}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>
                                {r.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleReview(r._id, 'approved')} className="text-sm text-green-600 hover:underline cursor-pointer">อนุมัติ</button>
                                        <button onClick={() => handleReview(r._id, 'rejected')} className="text-sm text-red-600 hover:underline cursor-pointer">ปฏิเสธ</button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AcademicLevelRequestsPanel;