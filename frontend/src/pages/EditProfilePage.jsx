import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const TITLE_OPTIONS = ['นาย', 'นาง', 'นางสาว'];
const RELIGION_OPTIONS = ['พุทธ', 'คริสต์', 'อิสลาม', 'อื่นๆ'];
const EDUCATION_OPTIONS = ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'อื่นๆ'];
const ACADEMIC_LEVEL_OPTIONS = ['ครูผู้ช่วย', 'ชำนาญการ', 'ชำนาญการพิเศษ', 'เชี่ยวชาญ', 'อื่นๆ'];

const SectionTitle = ({ children }) => (
    <h2 className="text-[#2d6e5e] font-bold text-lg border-b-2 border-[#2d6e5e] pb-1 mb-4 mt-6">
        {children}
    </h2>
);

const Field = ({ label, required, children }) => (
	 <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
    </div>
);

const DisplayField = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-500">{label}</label>
        <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700 min-h-[38px]">
            {value || <span className="text-gray-400">-</span>}
        </div>
    </div>
);

const inputClass =  "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e] focus:border-transparent transition";
const selectClass = `${inputClass} bg-white`;

export default function EditProfilePage() {
	const navigate = useNavigate();
	const { user: authUser } = useAuth();

	const [profile, setProfile] = useState(null);

	const [form, setForm] = useState({
        mobilePhone: '', lineId: '',
        healthCondition: '', foodRestrictions: ''
    });

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await api.get('/auth/me');
				const u = res.data.user;

				setProfile(u);
				setForm({
                    mobilePhone: u.mobilePhone || '',
                    lineId: u.lineId || '',
                    healthCondition: u.healthCondition || '',
                    foodRestrictions: u.foodRestrictions || '',
                });
			} catch(err) {
				console.error(err);
				setError('ไม่สามารถโหลดข้อมูลได้');
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);

	const handleChange = (e) => {
		setForm(prev => ({...prev, [e.target.name]: e.target.value}));
		setSuccess(false);
		setError(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		setError(null);
		try {
			const res = await api.put('/auth/profile', form);
			setSuccess(true);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch(err) {
			setError(err.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
		} finally {
			setSaving(false);
		}
	};

	if (loading) return (
        <div className="min-h-screen bg-[#2d6e5e]">
            <Navbar />
            <div className="flex justify-center items-center h-64 text-white text-lg">
                ⏳ กำลังโหลดข้อมูล...
            </div>
        </div>
    );


	return (
        <div className="min-h-screen bg-[#2d6e5e]">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    แก้ไขข้อมูลส่วนตัว
                </h1>

                {/* Success Alert */}
                {success && (
                    <div className="bg-green-50 border border-green-300 text-green-800 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
                        <span className="text-xl">✅</span>
                        <span className="font-medium">อัปเดตข้อมูลสำเร็จแล้ว</span>
                    </div>
                )}

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
                        <span className="text-xl">❌</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">

                    {/* ข้อมูลส่วนตัว */}
                    <SectionTitle>ข้อมูลส่วนตัว</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DisplayField label="คำนำหน้า" value={profile?.title} />
						<DisplayField label="ชื่อ" value={profile?.firstName} />
						<DisplayField label="นามสกุล" value={profile?.lastName} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <DisplayField label="ศาสนา" value={profile?.religion} />
						<DisplayField label="วันเกิด" value={profile?.birthDate?.split('T')[0]} />
						<DisplayField label="อายุ" value={profile?.age} />
                    </div>

                    <div className="mt-4">
                        <DisplayField label="เลขบัตรประชาชน" value={profile?.idCard} />
                    </div>

                    {/* ข้อมูลติดต่อ */}
                    <SectionTitle>ข้อมูลติดต่อ</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="เบอร์โทรศัพท์มือถือ">
                            <input name="mobilePhone" value={form.mobilePhone} onChange={handleChange} placeholder="0XX-XXX-XXXX" className={inputClass} />
                        </Field>
                        <Field label="LINE ID">
                            <input name="lineId" value={form.lineId} onChange={handleChange} className={inputClass} />
                        </Field>
                    </div>

                    {/* การศึกษา */}
                    <SectionTitle>การศึกษา</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DisplayField label="ระดับการศึกษา" value={profile?.education} />
						<DisplayField label="วิชาเอก / สาขา" value={profile?.major} />
                    </div>

                    {/* ข้อมูลการทำงาน */}
                    <SectionTitle>ข้อมูลการทำงาน</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DisplayField label="ตำแหน่ง" value={profile?.position} />
						<DisplayField label="วิทยฐานะ" value={profile?.academicLevel} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <DisplayField label="โรงเรียน / สถานศึกษา" value={profile?.school} />
						<DisplayField label="เขต" value={profile?.district} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <DisplayField label="โทรศัพท์ที่ทำงาน" value={profile?.officePhone} />
						<DisplayField label="โทรศัพท์โรงเรียน" value={profile?.schoolPhone} />
                    </div>

                    {/* ข้อมูลสุขภาพ */}
                    <SectionTitle>ข้อมูลสุขภาพ</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="โรคประจำตัว / สภาวะสุขภาพ">
                            <textarea name="healthCondition" value={form.healthCondition} onChange={handleChange} rows={3} className={inputClass} placeholder="ถ้าไม่มีให้เว้นว่าง" />
                        </Field>
                        <Field label="ข้อจำกัดด้านอาหาร">
                            <textarea name="foodRestrictions" value={form.foodRestrictions} onChange={handleChange} rows={3} className={inputClass} placeholder="เช่น ไม่กินเนื้อวัว, แพ้อาหารทะเล" />
                        </Field>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-8 justify-end">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 rounded-lg border cursor-pointer border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-2 rounded-lg cursor-pointer bg-[#2d6e5e] text-white font-medium hover:bg-[#1f5045] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}