import { useEffect, useState } from "react"
import api from "../utils/api";

const ExportFieldPickerModal = ({ isOpen, course, onClose }) => {
	const [fields, setFields] = useState([]);
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!isOpen || !course) return;
		const fetchFields = async () => {
			try {
				setLoading(true);
				const res = await api.get(`/registrations/admin/export-fields/${course._id}`);
				setFields(res.data.fields);
				setSelected(res.data.fields.map(f => f.key));
			} catch(err) {
				console.error('Failed to load export fields', err);
			} finally {
				setLoading(false);
			}
		};
		fetchFields();
	}, [isOpen, course]);

	const toggleField = (key) => {
		setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
	};

	const toggleGroup = (groupKeys) => {
		const allSelected = groupKeys.every(k => selected.includes(k));
		setSelected(prev => allSelected
			? prev.filter(k => !groupKeys.includes(k))
			: [...new Set([...prev, ...groupKeys])]
		);
	};

	const handleExport = async () => {
		const response = await api.get(`/registrations/admin/export/${course._id}`, {
			params: { fields: selected.join(',')},
			responseType: 'blob'
		});

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `registration-${course.title}-${Date.now()}.xlsx`);
		document.body.appendChild(link);
		link.click();
		link.remove();
		onClose();
	};

	if (!isOpen) return null;

	const groups = [...new Set(fields.map(f => f.group))];

	return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold text-gray-800 mb-4">เลือกข้อมูลที่จะ Export ({course?.title})</h2>

                {loading ? (
                    <p className="text-gray-500 text-sm">กำลังโหลด...</p>
                ) : (
                    <div className="space-y-4">
                        {groups.map(group => {
                            const groupKeys = fields.filter(f => f.group === group).map(f => f.key);
                            const allSelected = groupKeys.every(k => selected.includes(k));
                            return (
                                <div key={group}>
                                    <label className="flex items-center gap-2 font-medium text-sm text-gray-800 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={() => toggleGroup(groupKeys)}
                                        />
                                        {group}
                                    </label>
                                    <div className="pl-6 grid grid-cols-2 gap-1">
                                        {fields.filter(f => f.group === group).map(f => (
                                            <label key={f.key} className="flex items-center gap-2 text-sm text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.includes(f.key)}
                                                    onChange={() => toggleField(f.key)}
                                                />
                                                {f.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={selected.length === 0}
                        className="px-4 py-2 bg-[#2d6e5e] text-white rounded-lg hover:bg-[#235a4c] disabled:opacity-50 cursor-pointer"
                    >
                        Export Excel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExportFieldPickerModal;