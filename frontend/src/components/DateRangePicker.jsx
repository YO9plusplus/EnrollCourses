import { useState } from 'react';

const MONTHS_TH = [
    'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
    'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'
];
const DAYS_TH = ['อา','จ','อ','พ','พฤ','ศ','ส'];

const DateRangePicker = ({ dateRange, onChange }) => {
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date();

    const [viewYear, setViewYear] = useState(
        dateRange.start ? parseInt(dateRange.start.slice(0, 4)) : now.getFullYear()
    );
    const [viewMonth, setViewMonth] = useState(
        dateRange.start ? parseInt(dateRange.start.slice(5, 7)) - 1 : now.getMonth()
    );
    const [hoverDate, setHoverDate] = useState('');

    const { start, end } = dateRange;
    const isPicking = !!start && !end;
    const sameDay = !!start && start === end;

    // สร้าง cells ของเดือนนั้น
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push(
            `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
        );
    }

    const handleClick = (d) => {
        if (d < today) return;

		if (start && end) {
			onChange({ start: d, end: ''});
			return;
		}

        // ถ้ายังไม่มี start หรือ click วันก่อน start → reset
        if (!start || d < start) {
            onChange({ start: d, end: '' });
        } else {
            onChange({ start, end: d });
        }
    };

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    };

    // effectiveEnd: ใช้ hoverDate ถ้ากำลัง pick end และ hover >= start
    const effectiveEnd = end || (isPicking && hoverDate >= start ? hoverDate : '');
    const isHover = !end && !!effectiveEnd;

    const rangeBg = `rgba(45,110,94,${isHover ? 0.07 : 0.13})`;

    const statusText = () => {
        if (!start) return 'คลิกเลือกวันเริ่มต้น';
        if (!end) return 'คลิกเลือกวันสิ้นสุด';
        if (sameDay) return `เลือก 1 วัน: ${start}`;
        const diff = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
        return `${diff} วัน`;
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white select-none">
            {/* Header nav */}
            <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer text-gray-500 text-xl leading-none">
                    ‹
                </button>
                <span className="text-sm font-semibold text-gray-700">
                    {MONTHS_TH[viewMonth]} {viewYear + 543}
                </span>
                <button type="button" onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer text-gray-500 text-xl leading-none">
                    ›
                </button>
            </div>

            {/* วันในสัปดาห์ */}
            <div className="grid grid-cols-7 mb-1">
                {DAYS_TH.map(d => (
                    <div key={d} className="text-center text-xs text-gray-400 py-1">{d}</div>
                ))}
            </div>

            {/* Grid วันที่ */}
            <div className="grid grid-cols-7">
                {cells.map((d, i) => {
                    if (!d) return <div key={i} className="h-9" />;

                    const disabled = d < today;
                    const isStart = d === start;
                    const isEnd = d === end;
                    const selected = isStart || isEnd;
                    const isEffectiveEnd = d === effectiveEnd;
					const inRange = !!(
						start && effectiveEnd &&
						effectiveEnd !== start &&
						d > start &&
						d < effectiveEnd
					);
                    const isToday = d === today;

                    return (
                        <div
                            key={d}
                            className="relative h-9 flex items-center justify-center"
                            onClick={() => !disabled && handleClick(d)}
                            onMouseEnter={() => isPicking && !disabled && setHoverDate(d)}
                            onMouseLeave={() => setHoverDate('')}
                        >
                            {/* Range bar: วันกลาง */}
                            {inRange && (
								<div className="absolute inset-y-1 left-0 right-0"
									style={{ backgroundColor: rangeBg }} />
							)}

							{/* ครึ่งขวาของ start → ต่อออกไปหา end */}
							{isStart && effectiveEnd && effectiveEnd !== start && (
								<div className="absolute inset-y-1 left-1/2 right-0"
									style={{ backgroundColor: rangeBg }} />
							)}

							{/* ครึ่งซ้ายของ end (รวม hover) → ต่อมาจาก start */}
							{isEffectiveEnd && effectiveEnd !== start && (
								<div className="absolute inset-y-1 left-0 right-1/2"
									style={{ backgroundColor: rangeBg }} />
							)}

                            {/* วงกลมวันที่ */}
                            <div className={[
                                'relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors',
                                selected
                                    ? 'bg-[#2d6e5e] text-white font-semibold'
                                    : isToday
                                    ? 'border-2 border-[#2d6e5e] text-[#2d6e5e] font-semibold'
                                    : 'text-gray-700',
                                disabled
                                    ? 'text-gray-200 cursor-not-allowed'
                                    : selected
                                    ? 'cursor-pointer'
                                    : 'cursor-pointer hover:bg-[#2d6e5e]/10',
                            ].filter(Boolean).join(' ')}>
                                {parseInt(d.slice(8))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Status */}
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-center text-gray-400 min-h-4">
                {statusText()}
            </div>
        </div>
    );
};

export default DateRangePicker;