import { optimizeImage } from "../utils/cloudinary";

const CourseDetailCard = ({ course }) => {
  const LOCATION_NAME = "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร";
  const GOOGLE_MAPS_URL = "https://maps.google.com/?q=869+ถนนลาดหญ้า+คลองสาน+Bangkok+Thailand+10600";

  const formatDates = (dates) => {
    if (!dates || dates.length == 0) return 'ยังไม่กำหนด';
    return dates.map(d =>
      new Date(d).toLocaleDateString('th-TH', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    ).join(', ');
  };
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Course Image */}
            <div className="w-full h-64 bg-gray-200 overflow-hidden">
                <img
                    src={optimizeImage(course.image, 600)}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {course.title}
                </h2>

                <div className="space-y-3 text-gray-700">
                    {/* Date */}
                    <div className="flex items-start">
                        <span className="font-semibold mr-2">📅 วันที่:</span>
                        <span >{formatDates(course.dates)}</span>
                    </div>

                    {/* Location + Map */}
                    <div className="flex items-start">
                        <span className="font-semibold mr-2 whitespace-nowrap">📍 สถานที่:</span>
                        <span>{course.location}</span>
                    </div>

                    {/* Map Card */}
                    <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        {/* Map Preview */}
                        <div className="relative w-full h-48 bg-gray-100">
                            <iframe
                                title="map"
                                src={`https://maps.google.com/maps?q=869+ถนนลาดหญ้า+คลองสาน+Bangkok+10600&output=embed&z=16`}
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                            {/* Overlay gradient bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white/30 to-transparent pointer-events-none" />
                        </div>

                        {/* Map Footer */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                            <div>
                                <p className="text-xs font-semibold text-gray-700">{LOCATION_NAME}</p>
                                <p className="text-xs text-gray-400 mt-0.5">869 ถนนลาดหญ้า คลองสาน กรุงเทพฯ 10600</p>
                            </div>
                            <a
                                href={GOOGLE_MAPS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2d6e5e] text-white text-xs font-medium rounded-lg hover:bg-opacity-90 transition-all whitespace-nowrap"
                            >
                                🗺️ เปิด Maps
                            </a>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-lg mb-2">รายละเอียดหลักสูตร</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {course.fullDescription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailCard;