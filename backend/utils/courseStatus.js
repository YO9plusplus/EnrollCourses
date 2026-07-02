function getEffectiveStatus(course) {
	const lastDate = course.dates?.length
		? new Date(Math.max(...course.dates.map((d) => new Date(d).getTime())))
		: null;

	const today = new Date();
	today.setHours(0,0,0,0);

	if (lastDate && lastDate < today) return 'closed';

	if (course.status === 'upcoming') return 'open';

	return course.status;
}

module.exports = { getEffectiveStatus };