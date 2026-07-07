import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const FeedbackAdminPage = () => {
    const [threads, setThreads] = useState([]);
    const [selected, setSelected] = useState(null);
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchThreads = async () => {
        try {
            const res = await api.get('/feedbacks/admin/all');
            setThreads(res.data.feedbacks);
        } catch (err) {
            console.error('Failed to load feedback threads', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchThreads(); }, []);

    const handleReply = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imageFile) return;

        setSending(true);
        try {
            const formData = new FormData();
            formData.append('message', text);
            if (imageFile) formData.append('image', imageFile);

            const res = await api.post(`/feedbacks/admin/${selected._id}/messages`, formData);
            setSelected(res.data.feedback);
            setText('');
            setImageFile(null);
            fetchThreads();
        } catch (err) {
            alert('เกิดข้อผิดพลาด: ' + (err.response?.data?.message || 'ไม่สามารถส่งข้อความได้'));
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="p-8">กำลังโหลด...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-white rounded-xl shadow p-4">
                    <h2 className="font-bold text-gray-800 mb-3">Feedback ทั้งหมด ({threads.length})</h2>
                    <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                        {threads.map(t => (
                            <button
                                key={t._id}
                                onClick={() => setSelected(t)}
                                className={`w-full text-left p-3 rounded-lg border text-sm cursor-pointer ${selected?._id === t._id ? 'border-[#2d6e5e] bg-[#f0f9f7]' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <p className="text-gray-800 line-clamp-2">{t.messages[0]?.text || '(แนบรูปภาพ)'}</p>
                                <p className="text-xs text-gray-400 mt-1">{t.path} · {new Date(t.updatedAt).toLocaleString('th-TH')}</p>
                            </button>
                        ))}
                        {threads.length === 0 && <p className="text-sm text-gray-400">ยังไม่มี feedback</p>}
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-xl shadow p-4 flex flex-col" style={{ minHeight: '70vh' }}>
                    {!selected ? (
                        <p className="text-gray-400 m-auto">เลือก feedback ทางซ้ายเพื่อดูรายละเอียด</p>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                                {selected.messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${m.sender === 'admin' ? 'bg-[#2d6e5e] text-white' : 'bg-gray-100 text-gray-800'}`}>
                                            {m.text && <p>{m.text}</p>}
                                            {m.image?.filepath && <img src={m.image.filepath} alt="แนบ" className="mt-1 rounded max-w-full max-h-48 object-contain" />}
                                            <p className={`text-[10px] mt-1 ${m.sender === 'admin' ? 'text-white/70' : 'text-gray-400'}`}>
                                                {new Date(m.createdAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleReply} className="border-t pt-3 space-y-2">
                                <textarea
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    rows={2}
                                    placeholder="พิมพ์ตอบกลับ..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e] resize-none"
                                />
                                <div className="flex items-center gap-2">
                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0] || null)} className="text-xs flex-1" />
                                    <button
                                        type="submit"
                                        disabled={sending || (!text.trim() && !imageFile)}
                                        className="bg-[#2d6e5e] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#1f5045] disabled:opacity-50 cursor-pointer"
                                    >
                                        {sending ? '...' : 'ตอบกลับ'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackAdminPage;
