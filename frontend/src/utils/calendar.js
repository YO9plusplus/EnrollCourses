const THAI_MONTHS = [
  'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม',
];
const THAI_WEEKDAYS = ['อา','จ','อ','พ','พฤ','ศ','ส'];

const COLOR_PALETTE = [
  { bg: 'bg-emerald-500', text: 'text-white' },
  { bg: 'bg-amber-500',   text: 'text-white' },
  { bg: 'bg-sky-500',     text: 'text-white' },
  { bg: 'bg-rose-500',    text: 'text-white' },
  { bg: 'bg-violet-500',  text: 'text-white' },
  { bg: 'bg-orange-500',  text: 'text-white' },
  { bg: 'bg-cyan-600',    text: 'text-white' },
  { bg: 'bg-pink-500',    text: 'text-white' },
];

export function formatDateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay(); // 0 = อาทิตย์
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push({ date: new Date(year, month, i - startOffset + 1), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function getCourseColor(courseId) {
  let hash = 0;
  for (let i = 0; i < courseId.length; i++) hash = (hash * 31 + courseId.charCodeAt(i)) >>> 0;
  return COLOR_PALETTE[hash % COLOR_PALETTE.length];
}

export function buildWeekSegments(week, eventsByDate) {
	const keyOf = ({ course, round }) => `${course._id}::${round.roundNumber ?? round.dates[0]}`;

	const dayEntryKeys = week.map(({ date }) => 
		(eventsByDate[formatDateKey(date)] || []).map(keyOf)
	);

	const entryByKey = {};
	week.forEach(({ date }) => {
		(eventsByDate[formatDateKey(date)] || []).forEach((entry) => {
			entryByKey[keyOf(entry)] = entry;
		});
	});

	const segments = [];

	Object.keys(entryByKey).forEach((key) => {
		let start = null;
		for (let col = 0; col <= 7; col++) {
			const present = col < 7 && dayEntryKeys[col].includes(key);
			if (present && start == null) {
				start = col;
			}

			if (!present && start !== null) {
				const { course, round } = entryByKey[key];
				segments.push({ course, round, startCol: start, endCol: col - 1 });
				start = null;
			}
		}
	});
	
	return segments;
}

export function assignLanes(segments) {
	segments.sort((a,b) => a.startCol - b.startCol || (b.endCol - b.startCol) - (a.endCol - a.startCol));

	const laneEnd = []

	segments.forEach((seg) => {
		let lane = 0 ;
		while (laneEnd[lane] !== undefined && laneEnd[lane] >= seg.startCol)
			lane++;
		laneEnd[lane] = seg.endCol;
		seg.lane = lane;
	});
	return segments;
}

export { THAI_MONTHS, THAI_WEEKDAYS };