import { useState } from 'react';
import { api_anonymous } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const FeedbackWidget = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setSubmitting(true);
        try {
            await api_anonymous.post('/feedbacks', {
                message,
                path: window.location.pathname,
            });
            setSent(true);
            setMessage('');
            setTimeout(() => {
                setSent(false);
                setOpen(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to send feedback', err);
        } finally {
            setSubmitting(false);
        }
    };

    const buttonClass = isAdmin
        ? 'bg-[#2d6e5e] text-white hover:bg-[#1f5045]'
        : 'bg-white text-[#2d6e5e] border border-[#2d6e5e] hover:bg-[#f0f9f7]';

    const submitButtonClass = isAdmin
        ? 'bg-[#2d6e5e] text-white hover:bg-[#1f5045]'
        : 'bg-white text-[#2d6e5e] border border-[#2d6e5e] hover:bg-[#f0f9f7]';

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className={`fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full shadow-lg transition-colors cursor-pointer text-sm font-medium ${buttonClass}`}
            >
                💬 ให้ Feedback
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 left-6 z-40 bg-white rounded-xl shadow-xl border border-gray-200 w-80 p-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">แจ้ง Feedback (ไม่ระบุตัวตน)</h4>
                <button
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg leading-none"
                >
                    &times;
                </button>
            </div>

            {sent ? (
                <p className="text-sm text-green-600 py-4 text-center">ส่งความคิดเห็นแล้ว ขอบคุณครับ 🙏</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={4}
                        placeholder="พิมพ์ความคิดเห็นหรือปัญหาที่เจอ..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6e5e] resize-none"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={submitting || !message.trim()}
                        className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${submitButtonClass}`}
                    >
                        {submitting ? 'กำลังส่ง...' : 'ส่ง'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default FeedbackWidget;