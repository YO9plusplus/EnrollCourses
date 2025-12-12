import { useNavigate } from "react-router-dom";

const CourseCard = ({ title, description, image, id }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/detail/${id}`);
  };

  return (
    // FIXED: min-h-16] → min-h-[4rem], Added hover invert color effects with group
    <div onClick={handleEnroll} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:bg-(--thai-green) hover:border-(--thai-green) group cursor-pointer">
      {/* Course Image */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        {/* FIXED: min-h-16] → min-h-[4rem], Added group-hover:text-white */}
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 line-clamp-3 min-h-16 transition-colors duration-300">
          {title}
        </h3>

        {/* Course Description */}
        {/* ADDED: group-hover:text-white for invert effect */}
        <p className="text-gray-600 group-hover:text-white text-sm mb-4 line-clamp-2 transition-colors duration-300">
          {description}
        </p>

        {/* Enroll Button */}
        {/* ADDED: Button color invert on card hover */}
        <button
          onClick={handleEnroll} 
          className="mt-4 cursor-pointer w-full bg-(--thai-green) group-hover:bg-white text-white group-hover:text-(--thai-green) py-2.5 px-4 rounded-lg font-medium hover:shadow-md transition-all duration-300"
        >
          ลงทะเบียน
        </button>
      </div>
    </div>
  );
};

export default CourseCard;