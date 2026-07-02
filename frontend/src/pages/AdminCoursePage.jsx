import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import CourseFormModal from "../components/CourseFormModal";
import api from "../utils/api";
import { optimizeImage } from "../utils/cloudinary";

const AdminCoursePage = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [toast, setToast] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [editingCourse, setEditingCourse] = useState(null);

	const showToast = (message, type = 'success') => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3000);
	};
	
	const fetchCourses = async () => {
		try {
			setLoading(true);
			const response = await api.get('/courses');
			if (response.data.success) {
				setCourses(response.data.courses);
			}
		} catch(err) {
			showToast('โหลดข้อมูลไม่สำเร็จ', 'error');
		} finally {
			setLoading(false);
		}
	};
	
	useEffect(() => {
		fetchCourses();
	}, []);

	const handleCreate = () => {
		setEditingCourse(null);
		setShowModal(true);
	};

	const handleEdit = (course) => {
		setEditingCourse(course);
		setShowModal(true);
	};

	const handleDelete = async (course) => {
		if (!confirm(`ลบหลักสูตร "${course.title}" ?`)) return;
		try {
			await api.delete(`/courses/admin/${course._id}`);
			showToast('ลบหลักสูตรสำเร็จ');
			fetchCourses();
		} catch(err) {
			showToast('ลบไม่สำเร็จ', 'error');
		}
	};

	const handleSaved	 = () => {
		setShowModal(false);
		fetchCourses();
		showToast(editingCourse ? 'แก้ไขสำเร็จ' : 'เพิ่มหลักสูตรสำเร็จ');
	};

	const STATUS_LABEL = {
		open: 'เปิดรับสมัคร',
		full: 'เต็มแล้ว',
		closed: 'ปิดรับสมัคร',
	};

	const formatDates = (dates) => {
		if (!dates?.length) return '-';
		if (dates.length === 1) 
			return new Date(dates[0]).toLocaleDateString('th-TH', {day: 'numeric', month:'short', year:'numeric'})
		return new Date(dates[0]).toLocaleDateString('th-TH', {day: 'numeric', month:'short', year:'numeric'}) + ' - ' + new Date(dates[dates.length-1]).toLocaleDateString('th-TH', {day: 'numeric', month:'short', year:'numeric'});
	};

	if (loading) {
		return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64 text-gray-500">กำลังโหลด...</div>
            </AdminLayout>
        );
	}

	return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">จัดการหลักสูตร</h1>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-[#2d6e5e] text-white rounded-lg hover:bg-opacity-90 transition-colors cursor-pointer"
                >
                    + เพิ่มหลักสูตร
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หลักสูตร</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ที่นั่ง</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {courses.map(course => (
                            <tr key={course._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={optimizeImage(course.image, 600)} loading="lazy" alt={course.title} className="w-12 h-12 object-cover rounded" />
                                        <div>
                                            <div className="font-medium text-gray-900">{course.title}</div>
                                            <div className="text-xs text-gray-400">{course.formType}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{formatDates(course.dates)}</td>
                                <td className="px-6 py-4 text-sm">{STATUS_LABEL[course.status]}</td>
                                <td className="px-6 py-4 text-sm">{course.enrolledCount} / {course.capacity ?? '∞'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(course)}
                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors cursor-pointer"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course)}
                                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors cursor-pointer"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CourseFormModal
                isOpen={showModal}
                course={editingCourse}
                onClose={() => setShowModal(false)}
                onSaved={handleSaved}
            />

            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
                    {toast.message}
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminCoursePage;