import { useState, useEffect, useRef } from 'react';
import { api_anonymous } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { saveFeedbackToken, getFeedbackToken, getLastSeenCount, markAsSeen } from '../utils/feedbackToken';

const FeedbackWidget = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const [open, setOpen] = useState(false);
    const [token, setToken] = useState(getFeedbackToken());
    const [thread, setThread] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [sending, setSending] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ block: 'end' });
        }
    }, [open, thread]);

    const loadThread = async (t) => {
        try {
            const res = await api_anonymous.get(`/feedbacks/${t}`);
            setThread(res.data.feedback);
            const seen = getLastSeenCount();
            setUnreadCount(Math.max(0, res.data.feedback.messages.length - seen));
        } catch (err) {
            console.error('Failed to load feedback thread', err);
        }
    };

    useEffect(() => {
        if (!token) return;
        loadThread(token);
        const interval = setInterval(() => loadThread(token), 10000);
        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {
        if (open && thread) {
            markAsSeen(thread.messages.length);
            setUnreadCount(0);
        }
    }, [open, thread]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imageFile) return;

        setSending(true);
        try {
            const formData = new FormData();
            formData.append('message', text);
            formData.append('path', window.location.pathname);
            if (imageFile) formData.append('image', imageFile);
            if (replyingTo) {
                formData.append('replyToId', replyingTo.messageId);
                formData.append('replyToSender', replyingTo.sender);
                formData.append('replyToText', replyingTo.text);
            }

            if (!token) {
                const res = await api_anonymous.post('/feedbacks', formData);
                saveFeedbackToken(res.data.token);
                setToken(res.data.token);
                setThread(res.data.feedback);
            } else {
                const res = await api_anonymous.post(`/feedbacks/${token}/messages`, formData);
                setThread(res.data.feedback);
                markAsSeen(res.data.feedback.messages.length);
            }

            setReplyingTo(null);
            setText('');
            setImageFile(null);
        } catch (err) {
            console.error('Failed to send feedback message', err);
        } finally {
            setSending(false);
        }
    };

    const buttonClass = isAdmin
        ? 'bg-[#2d6e5e] text-white hover:bg-[#1f5045]'
        : 'bg-white text-[#2d6e5e] border border-[#2d6e5e] hover:bg-[#f0f9f7]';

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className={`fixed bottom-12 left-10 z-40 px-4 py-3 rounded-full shadow-lg transition-colors cursor-pointer text-sm font-medium ${buttonClass}`}
            >
                💬 ให้ Feedback
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div className="fixed bottom-12 left-10 z-40 bg-white rounded-xl shadow-xl border border-gray-200 w-80 flex flex-col" style={{ maxHeight: '70vh' }}>
            <div className="flex justify-between items-center px-4 py-3 border-b">
                <h4 className="font-semibold text-gray-800 text-sm">แจ้ง Feedback (ไม่ระบุตัวตน)</h4>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {!thread && (
                    <p className="text-xs text-gray-500">พิมพ์ปัญหาหรือความคิดเห็นด้านล่าง แล้วกดส่งได้เลยครับ</p>
                )}
                {thread?.messages.map((m, i) => (
                    <div key={m._id || i} className={`group flex items-end gap-1 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.sender === 'user' ? 'bg-[#2d6e5e] text-white' : 'bg-gray-100 text-gray-800'}`}>
                            {m.replyTo && (
                                <div className={`mb-1 pl-2 border-l-2 text-xs italic truncate ${m.sender === 'user' ? 'border-white/50 text-white/70' : 'border-gray-400 text-gray-500'}`}>
                                    <i className="bi bi-reply mr-1"></i>{m.replyTo.text}
                                </div>
                            )}
                            {m.text && <p>{m.text}</p>}
                            {m.image?.filepath && <img src={m.image.filepath} alt="แนบ" className="mt-1 rounded max-w-full max-h-48 object-contain" />}
                            <p className={`text-[10px] mt-1 ${m.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                                {new Date(m.createdAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
                            </p>
                        </div>
                        {m.sender !== 'user' && (
                            <button
                                type="button"
                                onClick={() => setReplyingTo({ messageId: m._id, sender: m.sender, text: m.text })}
                                                                            className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#2d6e5e] cursor-pointer shrink-0"
                                title="ตอบกลับข้อความนี้"
                            >
                                <i className="bi bi-reply-fill"></i>
                            </button>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="border-t p-3 space-y-2">
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
                    placeholder="พิมพ์ข้อความ..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e] resize-none"
                />
                <div className="flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0] || null)} className="text-xs flex-1" />
                    <button
                        type="submit"
                        disabled={sending || (!text.trim() && !imageFile)}
                        className="bg-[#2d6e5e] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#1f5045] disabled:opacity-50 cursor-pointer"
                    >
                        {sending ? '...' : 'ส่ง'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackWidget;
