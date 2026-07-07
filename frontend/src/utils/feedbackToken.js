const STORAGE_KEY = 'feedbackToken';
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 วัน

export function saveFeedbackToken(token) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        token,
        expiresAt: Date.now() + TTL_MS,
        lastSeenCount: 1,
    }));
}

export function getFeedbackToken() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        const { token, expiresAt } = JSON.parse(raw);
        if (Date.now() > expiresAt) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return token;
    } catch {
        return null;
    }
}

export function getLastSeenCount() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    try {
        return JSON.parse(raw).lastSeenCount || 0;
    } catch {
        return 0;
    }
}

export function markAsSeen(count) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
        const data = JSON.parse(raw);
        data.lastSeenCount = count;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
}

const ADMIN_SEEN_KEY = 'feedbackAdminSeen';

function getAdminSeenMap() {
    const raw = localStorage.getItem(ADMIN_SEEN_KEY);
    if (!raw) return {};
    try {
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

export function getAdminUnreadCount(threadId, totalMessages) {
    const lastSeen = getAdminSeenMap()[threadId] || 0;
    return Math.max(0, totalMessages - lastSeen);
}

export function markAdminThreadSeen(threadId, totalMessages) {
    const seen = getAdminSeenMap();
    seen[threadId] = totalMessages;
    localStorage.setItem(ADMIN_SEEN_KEY, JSON.stringify(seen));
}