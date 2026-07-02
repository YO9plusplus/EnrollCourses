import { getCourseColor } from '../utils/calendar';

const DayCoursesPopover = ({ date, courses, onSelect, onClose }) => (
  <>
    <div className="fixed inset-0 z-10" onClick={onClose} />
    <div className="absolute z-20 top-full left-0 mt-1 w-56 bg-white border rounded-lg shadow-xl p-2">
      <p className="text-gray-500 text-xs mb-2">
        หลักสูตรวันที่ {date.getDate()}/{date.getMonth() + 1}
      </p>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {courses.map((course) => {
          const color = getCourseColor(course._id);
          return (
            <button
              key={course._id}
              onClick={() => onSelect(course._id)}
              className={`w-full text-left rounded px-2 py-1 ${color.bg} ${color.text} hover:opacity-90 text-sm truncate`}
            >
              {course.title}
            </button>
          );
        })}
      </div>
    </div>
  </>
);

export default DayCoursesPopover;