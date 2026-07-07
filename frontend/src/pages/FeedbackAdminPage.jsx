import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { getAdminUnreadCount, markAdminThreadSeen } from '../utils/feedbackToken';

const FeedbackAdminPage = () => {
    const [threads, setThreads] = useState([]);
    const [selected, setSelected] = useState(null);
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [sending, setSending] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
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
            if (replyingTo) {
                formData.append('replyToId', replyingTo.messageId);
                formData.append('replyToSender', replyingTo.sender);
                formData.append('replyToText', replyingTo.text);
            }

            const res = await api.post(`/feedbacks/admin/${selected._id}/messages`, formData);
            setSelected(res.data.feedback);
            markAdminThreadSeen(selected._id, res.data.feedback.message.length);
            setReplyingTo(null);
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
                    <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        Feedback ทั้งหมด ({threads.length})
                        {threads.reduce((sum, t) => sum + getAdminUnreadCount(t._id, t.messages.length), 0) > 0 && (
                            <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                {threads.reduce((sum, t) => sum + getAdminUnreadCount(t._id, t.messages.length), 0)} ใหม่
                            </span>
                        )}
                    </h2>
                    <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                        {threads.map(t => {
                            const unread = getAdminUnreadCount(t._id, t.messages.length);
                            return (
                                <button
                                    key={t._id}
                                    onClick={() => { setSelected(t); setReplyingTo(null); markAdminThreadSeen(t._id, t.messages.length); }}
                                    className={`w-full text-left p-3 rounded-lg border text-sm cursor-pointer ${selected?._id === t._id ? 'border-[#2d6e5e] bg-[#f0f9f7]' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <p className="text-gray-800 line-clamp-2">{t.messages[0]?.text || '(แนบรูปภาพ)'}</p>
                                        {unread > 0 && (
                                            <span className="shrink-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                {unread}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{t.path} · {new Date(t.updatedAt).toLocaleString('th-TH')}</p>
                                </button>
                            );
                        })}
                        {threads.length === 0 && <p className="text-sm text-gray-400">ยังไม่มี feedback</p>}
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-xl shadow p-4 flex flex-col overflow-hidden" style={{ height: '82vh' }}>
                    {!selected ? (
                        <p className="text-gray-400 m-auto">เลือก feedback ทางซ้ายเพื่อดูรายละเอียด</p>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                                {selected?.messages.map((m, i) => (
                                <div key={m._id || i} className={`group flex items-end gap-1 ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.sender === 'admin' ? 'bg-[#2d6e5e] text-white' : 'bg-gray-100 text-gray-800'}`}>
                                        {m.replyTo && (
                                            <div className={`mb-1 pl-2 border-l-2 text-xs italic truncate ${m.sender === 'admin' ? 'border-white/50 text-white/70' : 'border-gray-400 text-gray-500'}`}>
                                                <i className="bi bi-reply mr-1"></i>{m.replyTo.text}
                                            </div>
                                        )}
                                        {m.text && <p>{m.text}</p>}
                                        {m.image?.filepath && <img src={m.image.filepath} alt="แนบ" className="mt-1 rounded max-w-full max-h-48 object-contain" />}
                                        <p className={`text-[10px] mt-1 ${m.sender === 'admin' ? 'text-white/70' : 'text-gray-400'}`}>
                                            {new Date(m.createdAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
                                        </p>
                                    </div>
                                    {m.sender !== 'admin' && (
                                        <button
                                            type="button"
                                            onClick={() => setReplyingTo({ messageId: m._id, sender: m.sender, text: m.text })}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#2d6e5e] cursor-pointer shrink-0"
                                            title="ตอบกลับข้อความนี้"
                                        >
                                            <i className="bi bi-reply-fill"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            </div>
                            <form onSubmit={handleReply} className="border-t pt-3 space-y-2">
                                {replyingTo && (
                                    <div className="flex items-center justify-between bg-gray-100 rounded-lg px-2 py-1 text-xs text-gray-600">
                                        <span className="truncate"><i className="bi bi-reply mr-1"></i>ตอบกลับ: {replyingTo.text}</span>
                                        <button type="button" onClick={() => setReplyingTo(null)} className="text-gray-400 hover:text-gray-700 cursor-pointer ml-2">
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                )}
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
