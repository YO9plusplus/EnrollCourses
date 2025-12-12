const CourseDetailCard = ({ course }) => {
    return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Course Image */}
      <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Details */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {course.title}
        </h2>

        <div className="space-y-3 text-gray-700">
          <div className="flex items-start">
            <span className="font-semibold mr-2">📅 วันที่:</span>
            <span>{course.date}</span>
          </div>

          <div className="flex items-start">
            <span className="font-semibold mr-2 whitespace-nowrap">📍 สถานที่:</span>
            <span>{course.location}</span>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">รายละเอียดหลักสูตร</h3>
            <p className="text-gray-600 leading-relaxed">
              {course.fullDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailCard;