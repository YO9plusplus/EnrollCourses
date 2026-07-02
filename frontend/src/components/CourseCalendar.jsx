import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateKey, buildWeekSegments, assignLanes, getMonthGrid, THAI_MONTHS, THAI_WEEKDAYS, getCourseColor } from '../utils/calendar';

const MAX_VISIBLE_PER_DAY = 2;

const CourseCalendar = ({ courses }) => {
	const navigate = useNavigate();
	const today = new Date();
	const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
	const [activeDay, setActiveDay] = useState(null);

	const eventsByDate = useMemo(() => {
		const map = {};
		courses.forEach((course) => {
			(course.dates || []).forEach((rawDate) => {
				const key = formatDateKey(rawDate);
				(map[key] ||= []).push(course);
			});
		});
		return map;
	}, [courses]);

	const weeks = useMemo(
		() => getMonthGrid(cursor.getFullYear(), cursor.getMonth()), [cursor]
	);

	const changeMonth = (delta) => {
		setActiveDay(null);
		setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
	};

	const goToCourse = (courseId) => navigate(`/detail/${courseId}`);

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-3 md:p-4 mb-10">
		<div className="flex items-center justify-between mb-4">
			<button onClick={() => changeMonth(-1)} className="px-3 py-1 rounded hover:bg-gray-100 text-(--thai-green) font-bold">‹</button>
			<h3 className="text-base md:text-lg font-bold text-gray-800">
			{THAI_MONTHS[cursor.getMonth()]} {cursor.getFullYear() + 543}
			</h3>
			<button onClick={() => changeMonth(1)} className="px-3 py-1 rounded hover:bg-gray-100 text-(--thai-green) font-bold">›</button>
		</div>

		<div className="grid grid-cols-7 text-center text-[10px] md:text-xs font-semibold text-gray-500 mb-1">
			{THAI_WEEKDAYS.map((w) => <div key={w}>{w}</div>)}
		</div>
		{weeks.map((week, wIdx) => {
			const segments = assignLanes(buildWeekSegments(week, eventsByDate));

			// จำนวน lane สูงสุดที่สัปดาห์นี้ต้องใช้ (อย่างน้อย 1 แม้ไม่มีคอร์สเลย)
			const laneCount = Math.max(1, ...segments.map((s) => s.lane + 1));

			return (
				<div
				key={wIdx}
				className="relative grid grid-cols-7 mb-1"
				// แถวแรก auto = สำหรับเลขวันที่, ตามด้วย laneCount แถว สูงแถวละ 20px = สำหรับ bar
				// สัปดาห์ไหนคอร์สทับกันเยอะ จะมีแถวเยอะ -> ทั้งแถวสูงขึ้นเอง
				style={{ gridTemplateRows: `minmax(48px, auto) repeat(${laneCount}, 20px)` }}
				>
				{/* layer ล่าง: กล่องวันที่ (เลขวันที่ + เส้นขอบ) — คุมแค่คอลัมน์ตัวเอง 1 คอลัมน์ */}
				{week.map(({ date, inMonth }, col) => (
					<div
					key={col}
					// gridColumn: col+1 เพราะ CSS grid column เริ่มนับที่ 1 ไม่ใช่ 0
					// gridRow span laneCount+1 = ยืดสูงครอบทั้งแถวเลขวันที่ + ทุก lane ของ bar
					style={{ gridColumn: col + 1, gridRow: `1 / span ${laneCount + 1}` }}
					className={`rounded-lg border min-w-0 ${inMonth ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-50 text-gray-300'}`}
					>
					<span className="block text-right pr-1 text-xs">{date.getDate()}</span>
					</div>
				))}

				{/* layer บน: แถบยาวของแต่ละคอร์ส วาดทับกล่องวันที่ */}
				{segments.map((seg) => {
					const color = getCourseColor(seg.course._id);
					return (
					<button
						key={`${seg.course._id}-${seg.startCol}`}
						onClick={() => goToCourse(seg.course._id)}
						title={seg.course.title} // เผื่อชื่อยาวเกิน bar จะโดน truncate ตัด
						style={{
						// ช่วงคอลัมน์ที่ bar จะกิน: เริ่มที่ startCol+1 จบก่อน endCol+2
						// (ตัวเลขหลัง / ใน CSS grid คือ "เส้นถัดจากคอลัมน์สุดท้าย" ไม่ใช่คอลัมน์สุดท้ายเอง)
						gridColumn: `${seg.startCol + 1} / ${seg.endCol + 2}`,
						gridRow: seg.lane + 2, // +2 เพราะแถว 1 ถูกจองให้เลขวันที่ไปแล้ว
						}}
						className={`relative z-10 cursor-pointer min-w-0 truncate text-left text-[10px] px-1.5 mx-0.5 my-px rounded ${color.bg} ${color.text}`}
					>
						{seg.course.title}
					</button>
					);
				})}
				</div>
			);
			})}
		
		</div>
	);
};

export default CourseCalendar;