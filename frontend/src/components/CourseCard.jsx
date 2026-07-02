import { useNavigate } from "react-router-dom";
import { optimizeImage } from "../utils/cloudinary";

const STATUS_CONFIG = {
    open:     { label: 'เปิดรับสมัคร', bg: 'bg-green-200 text-green-800' },
    full:     { label: 'เต็มแล้ว',     bg: 'bg-gray-300 text-gray-500' },
    closed:   { label: 'ปิดรับสมัคร', bg: 'bg-red-200 text-red-700' },
};

const CourseCard = ({ title, description, image, id, status }) => {
  const navigate = useNavigate();
  const isDisabled = status === 'full' || status === 'closed' ;
  const statusInfo = STATUS_CONFIG[status];

  const handleEnroll = () => {
    if (isDisabled) return;
    navigate(`/detail/${id}`);
  };

  return (
        <div className="relative mt-4"> {/* mt-4 เผื่อที่ให้ badge โผล่เหนือ card */}

            {/* Status badge — โผล่เหนือ card */}
            {statusInfo && (
                <div className={`absolute -top-3.5 left-4 z-10 px-3 py-1 rounded text-xs font-bold shadow ${statusInfo.bg}`}>
                    {statusInfo.label}
                </div>
            )}

            {/* Card — เอา overflow-hidden ออกเพื่อให้ badge โผล่ได้ */}
            <div
                onClick={handleEnroll}
                className={`bg-white rounded-lg shadow-lg border transition-all duration-300
                    ${isDisabled
                        ? 'opacity-60 cursor-not-allowed border-gray-200'
                        : 'hover:shadow-xl hover:bg-(--thai-green) hover:border-(--thai-green) group cursor-pointer border-gray-100'
                    }`}
            >
                {/* Image — ใส่ rounded-t-lg overflow-hidden แทน เพื่อ clip มุมบน */}
                <div className="h-48 bg-gray-200 overflow-hidden rounded-t-lg">
                    <img
                        src={optimizeImage(image, 600)}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 line-clamp-3 min-h-16 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white text-sm mb-4 line-clamp-2 transition-colors duration-300">
                        {description}
                    </p>
                    <button
                        onClick={handleEnroll}
                        disabled={isDisabled}
                        className={`mt-4 w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300
                            ${isDisabled
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-(--thai-green) group-hover:bg-white text-white group-hover:text-(--thai-green) cursor-pointer hover:shadow-md'
                            }`}
                    >
                        {isDisabled ? statusInfo.label : 'ลงทะเบียน'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;