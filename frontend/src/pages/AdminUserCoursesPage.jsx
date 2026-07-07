import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import api from "../utils/api";
import AdminLayout from "../components/AdminLayout";

const AdminUserCoursesPage = () => {
	const { user, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (!isAuthenticated || user?.role !== 'admin') {
			navigate('/');
		}
	}, [isAuthenticated, user, navigate]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await api.get('/registrations/admin/by-user');
			if (response.data.success) setUsers(response.data.users);
		} catch(err) {
			console.error('Error fetching users courses:', err);
		} finally {
			setLoading(false);
		}
	};

	const filteredUsers = users.filter(u => {
		const term = searchTerm.toLowerCase();
		const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
		return fullName.includes(term) || u.email.toLowerCase().includes(term);
	});

	if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-xl text-gray-600">กำลังโหลด...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">หลักสูตรที่สำเร็จของผู้ใช้</h1>
                <p className="text-gray-600">
                    แสดงเฉพาะหลักสูตรที่มีสถานะ "เสร็จสิ้น" เรียงตามจำนวนที่สมัครมากที่สุด
                </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ค้นหาชื่อ หรืออีเมล..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ-นามสกุล</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">โรงเรียน</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จำนวนหลักสูตรที่สำเร็จ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รายชื่อหลักสูตร</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">ไม่พบข้อมูล</td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.userId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{u.firstName} {u.lastName}</div>
                                            <div className="text-sm text-gray-500">{u.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.school || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {u.courseCount} หลักสูตร
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <ul className="list-disc list-inside space-y-1">
                                                {u.courses.map((c) => (
                                                    <li key={c._id}>{c.title}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminUserCoursesPage;