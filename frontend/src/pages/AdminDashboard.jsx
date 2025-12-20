import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegistrationDetailModal from "../components/RegistrationDetailModal";
import api from '../utils/api';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });

    const handleViewDetails = (registration) => {
        setSelectedRegistration(registration);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedRegistration(null);
        setShowModal(false);
    };

    // Filters
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Redirect if not admin
    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    // Fetch all registrations
    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const response = await api.get('/registrations/admin/all');

            if (response.data.success) {
                setRegistrations(response.data.registrations);
                setFilteredRegistrations(response.data.registrations);
                calculateStats(response.data.registrations);
            }
        } catch(error) {
            console.error('Error fetching registrations: ', error);
            alert('ไม่สามารถโหลดข้อมูลได้');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        setStats({
            total: data.length,
            pending: data.filter(r => r.status === 'pending').length,
            approved: data.filter(r => r.status === 'approved').length,
            rejected: data.filter(r => r.status === 'rejected').length
        });
    };

    // Apply filters
    useEffect(() => {
        let filtered = [...registrations];

        // Filter by course
        if (selectedCourse !== 'all') {
            filtered = filtered.filter(r => r.courseId === selectedCourse);
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(r => r.status === selectedStatus)
        }

        // Search
        if (searchTerm) {
            filtered = filtered.filter(r => 
                r.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.user.school?.toLowerCase().includes(searchTerm.toLowerCase())
            );

        }
        setFilteredRegistrations(filtered);
    }, [selectedCourse, selectedStatus, searchTerm, registrations]);

    const handleStatusChange = async (registrationId, newStatus) => {
        try {
            const response = await api.put(`/registrations/admin/${registrationId}/status`, {
                status: newStatus
            });

            if (response.data.success) {
                // Update local state
                setRegistrations(prev =>
                    prev.map(reg =>
                        reg._id === registrationId
                            ? { ...reg, status: newStatus }
                            : reg
                    )
                );
                alert('อัพเดตสถานะสำเร็จ');
            }
        } catch(error) {
            console.error('Error updating status:', error);
            alert('ไม่สามารถอัพเดตสถานะได้');
        }
    };

    const handleExport = async (courseId) => {
        try {
            const response = await api.get(`/registrations/admin/export/${courseId}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `registrations-${courseId}-${Date.now()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch(error) {
            console.error('Export error:', error);
            alert('ไม่สามารถแปลงไฟล์เป็น excel ได้');
        }
    }

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
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
        );
    };

    const getCourseTitle = (courseId) => {
        return courseId === '10'
            ? 'ลูกเสือ'
            : 'ยุวกาชาด';
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-xl text-gray-600">กำลังโหลด...</div>
                </div>
            </AdminLayout>
        )
    }

    return (
    <AdminLayout>
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                แดชบอร์ดผู้ดูแลระบบ
            </h1>
            <p className="text-gray-600">จัดการใบสมัครเข้าฝึกอบรม</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm mb-1">ทั้งหมด</div>
                <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm mb-1">รอดำเนินการ</div>
                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm mb-1">อนุมัติ</div>
                <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm mb-1">ไม่อนุมัติ</div>
                <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
            </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    ค้นหา
                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ชื่อ, อีเมล, โรงเรียน..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                />
                </div>

                {/* Course Filter */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    หลักสูตร
                </label>
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                >
                    <option value="all">ทั้งหมด</option>
                    <option value="10">ลูกเสือ</option>
                    <option value="11">ยุวกาชาด</option>
                </select>
                </div>

                {/* Status Filter */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานะ
                </label>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                >
                    <option value="all">ทั้งหมด</option>
                    <option value="pending">รอดำเนินการ</option>
                    <option value="approved">อนุมัติ</option>
                    <option value="rejected">ไม่อนุมัติ</option>
                </select>
                </div>
            </div>

            {/* Export Buttons */}
            <div className="mt-4 flex gap-4">
                <button
                onClick={() => handleExport('10')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                📥 ส่งออก Excel (ลูกเสือ)
                </button>
                <button
                onClick={() => handleExport('11')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                📥 ส่งออก Excel (ยุวกาชาด)
                </button>
            </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        วันที่สมัคร
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        ชื่อ-นามสกุล
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        โรงเรียน
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        หลักสูตร
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        สถานะ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        จัดการ
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRegistrations.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        ไม่พบข้อมูล
                        </td>
                    </tr>
                    ) : (
                    filteredRegistrations.map((registration) => (
                        <tr key={registration._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(registration.submittedAt).toLocaleDateString('th-TH')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                            {registration.user.firstName} {registration.user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                            {registration.user.email}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {registration.user.school || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="font-medium">{getCourseTitle(registration.courseId)}</div>
                            <div className="text-xs text-gray-500">
                            {registration.courseType}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(registration.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                            {registration.status === 'pending' && (
                                <>
                                <button
                                    onClick={() => handleStatusChange(registration._id, 'approved')}
                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                >
                                    อนุมัติ
                                </button>
                                <button
                                    onClick={() => handleStatusChange(registration._id, 'rejected')}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    ไม่อนุมัติ
                                </button>
                                </>
                            )}
                            <button
                                onClick={() => handleViewDetails(registration)}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                ดูรายละเอียด
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            </div>

            {/* Registration Detail Modal */}
            <RegistrationDetailModal
                registration={selectedRegistration}
                isOpen={showModal}
                onClose={handleCloseModal}
                onStatusChange={handleStatusChange}
            />
    </AdminLayout>
  );
}

export default AdminDashboard;