import { useEffect, useState } from "react";
import api from "../utils/api";
import DateRangePicker from "./DateRangePicker";
import { optimizeImage } from "../utils/cloudinary";
import { fixedSubCourses } from "../config/fixedSubCourses";

const EMPTY_FORM = {
	title: '',
    location: '',
    fullDescription: '',
    status: 'open',
    capacity: '',
    dates: [],
	formType: '',
	subCourses: [],
};

const CourseFormModal = ({ isOpen, course, onClose, onSaved }) => {
	const [form, setForm] = useState(EMPTY_FORM);
	const [imageFile, setImageFile] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [dateRange, setDateRange] = useState({ start: '', end: ''});

	
	useEffect(() => {
		if (!isOpen) return;
		if (course) {
			const sortedDates = [...course.dates]
				.map( d=> new Date(d).toISOString().slice(0, 10))
				.sort();

			setForm({
				title: course.title,
				location: course.location,
				fullDescription: course.fullDescription,
				status: course.status,
				capacity: course.capacity,
				dates: sortedDates,
				formType: course.formType || '',
				subCourses: course.subCourses || [],
			});

			if (sortedDates.length > 0) {
				setDateRange({
					start: sortedDates[0],
					end: sortedDates[sortedDates.length - 1]
				});
			}
		} else {
			setForm(EMPTY_FORM);
			setDateRange({ start: '', end: ''});
		}
		setImageFile(null);
		setError('');
	}, [isOpen, course]);
	
	const today = new Date().toISOString().slice(0, 10);

	const generateDateRange = (start, end) => {
		const result = [];
		const current = new Date(start);
		const last = new Date(end);
		while (current <= last) {
			result.push(current.toISOString().slice(0,10));
			current.setDate(current.getDate() + 1);
		}
		return result;
	};

	useEffect(() => {
		if ((form.formType === 'scout' || form.formType === 'redcross') && form.subCourses.length === 0) {
			setForm(p => ({
				...p,
				subCourses: fixedSubCourses[p.formType].map(sc => ({ ...sc, dates: []}))
			}));
		}
	}, [form.formType]);

	const handleRangeChange = (range) => {
		setDateRange(range);
		if (range.start && range.end) {
			setForm(p => ({ ...p, dates: generateDateRange(range.start, range.end) }));
		} else if (range.start) {
			setForm(p => ({ ...p, dates: [range.start]}));
		} else {
			setForm(p => ({ ...p, dates: [] }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setError('');

		try {
			const data = new FormData();
			data.append('title',form.title);
			data.append('location', form.location);
			data.append('fullDescription', form.fullDescription);
			data.append('status', form.status);
			if(form.capacity !== '' && form.capacity !== null) data.append('capacity', form.capacity);

			const datesToSend = (dateRange.start && dateRange.end)
				? generateDateRange(dateRange.start, dateRange.end)
				: dateRange.start
				? [dateRange.start]
				: [];

			if (datesToSend.length === 0) {
				setError('กรุณาเลือกวันที่อบรม');
				setSubmitting(false);
				return;
			}
			datesToSend.forEach(d => data.append('dates', d));

			if (form.formType) data.append('formType', form.formType);
			if (imageFile) data.append('image', imageFile);

			data.append('subCourses', JSON.stringify(
				form.subCourses.filter(sc => sc.value && sc.label)
			));

			if (course) {
				await api.put(`courses/admin/${course._id}`, data); // UPDATE
			} else {
				await api.post('/courses/admin', data); // CREATE
			}

			onSaved();
		} catch(err){
			setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
		} finally{
			setSubmitting(false);
		}
	};

	const addSubCourse = () => {
		setForm(p => ({ ...p, subCourses: [...p.subCourses, { value: '', label: '',duration: '', requirement: ''}]}))
	};

	const removeSubCourse = (i) => {
		setForm(p => ({ ...p, subCourses: p.subCourses.filter((_, idx) => idx !== i)}));
	};

	const updateSubCourse = (i, field, val) => {
		setForm(p => {
			const updated = [...p.subCourses];
			updated[i] = {...updated[i], [field]: val};
			return {...p, subCourses: updated};
		});
	};

	if (!isOpen) return null;

	return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {course ? 'แก้ไขหลักสูตร' : 'เพิ่มหลักสูตรใหม่'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อหลักสูตร</label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">รูปภาพ</label>
                        {course?.image && !imageFile && (
                            <img src={optimizeImage(course.image, 600)} alt="current" className="h-24 object-cover rounded mb-2" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setImageFile(e.target.files[0] || null)}
                            className="w-full text-sm text-gray-500"
                            {...(!course && { required: true })}
                        />
                    </div>

                    {/* Dates */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">ช่วงวันที่อบรม</label>
						<DateRangePicker dateRange={dateRange} onChange={handleRangeChange} />
						{form.dates.length > 0 && (
							<div className="mt-2">
								<p className="text-xs text-gray-500 mb-1">วันที่ทั้งหมด {form.dates.length} วัน</p>
								<div className="flex flex-wrap gap-1">
									{form.dates.map((d, i) => (
										<span key={i} className="px-2 py-0.5 bg-[#2d6e5e]/10 text-[#2d6e5e] text-xs rounded-full">
											{new Date(d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
										</span>
									))}
								</div>
							</div>
						)}
					</div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">สถานที่</label>
                        <input
                            type="text"
                            required
                            value={form.location}
                            onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                        />
                    </div>

                    {/* Full Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                        <textarea
                            required
                            rows={4}
                            value={form.fullDescription}
                            onChange={e => setForm(p => ({ ...p, fullDescription: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                        />
                    </div>

                    {/* Row: status + capacity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                            <select
                                value={form.status}
                                onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                            >
                                <option value="open">เปิดรับสมัคร</option>
                                <option value="full">เต็มแล้ว</option>
                                <option value="closed">ปิดรับสมัคร</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนที่นั่ง</label>
                            <input
                                type="number"
                                min={1}
                                value={form.capacity}
                                onChange={e => setForm(p => ({ ...p, capacity: e.target.value }))}
                                placeholder="ไม่จำกัด"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                            />
                        </div>
                    </div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">ประเภทฟอร์มสมัคร</label>
						<select
							value={form.formType}
							onChange={e => setForm(p => ({ ...p, formType: e.target.value }))}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
						>
							<option value="">ไม่เปิดรับสมัครออนไลน์</option>
							<option value="scout">ลูกเสือ (scout)</option>
							<option value="redcross">ยุวกาชาด (redcross)</option>
						</select>
						<p className="text-xs text-gray-400 mt-1">กำหนดว่าฟอร์มสมัครจะแสดง field ชุดไหน</p>
					</div>
					
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">หลักสูตรย่อย</label>

						{(form.formType === 'scout' || form.formType === 'redcross') ? (
							<div className="space-y-3">
								{form.subCourses.map((sc, i) => (
									<div key={sc.value || i} className="border border-gray-200 rounded-lg p-3 space-y-2">
										<p className="text-sm font-medium text-gray-700">{sc.label}</p>
										<input
											type="date"
											value={sc.dates?.[0] || ''}
											onChange={e => updateSubCourse(i, 'dates', e.target.value ? [e.target.value] : [])}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
										/>
									</div>
								))}
							</div>
						) : (
							<>
								<div className="space-y-3">
									{form.subCourses.map((sc, i) => (
										<div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
											<div className="flex justify-between items-center">
												<span className="text-sm font-medium text-gray-500">หลักสูตรย่อยที่ {i + 1}</span>
												<button
													type="button"
													onClick={() => removeSubCourse(i)}
													className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
												>
													ลบ
												</button>
											</div>
											<input
												type="text"
												placeholder="value เช่น สำรอง, ผู้บริหาร"
												value={sc.value}
												onChange={e => updateSubCourse(i, 'value', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
											/>
											<input
												type="text"
												placeholder="label ชื่อเต็มที่แสดงในฟอร์ม"
												value={sc.label}
												onChange={e => updateSubCourse(i, 'label', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
											/>
											<input
												type="text"
												placeholder="ระยะเวลา เช่น 5 วัน 4 คืน"
												value={sc.duration}
												onChange={e => updateSubCourse(i, 'duration', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
											/>
											<input
												type="text"
												placeholder="คุณสมบัติ (ถ้ามี)"
												value={sc.requirement}
												onChange={e => updateSubCourse(i, 'requirement', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
											/>
										</div>
									))}
								</div>
								<button
									type="button"
									onClick={addSubCourse}
									className="mt-2 text-sm text-[#2d6e5e] hover:underline cursor-pointer"
								>
									+ เพิ่มหลักสูตรย่อย
								</button>
							</>
						)}
					</div>			

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-[#2d6e5e] text-white rounded-lg hover:bg-[#235a4c] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'กำลังบันทึก...' : 'บันทึก'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseFormModal;