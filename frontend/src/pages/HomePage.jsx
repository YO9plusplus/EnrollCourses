import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'
import { useState, useEffect } from 'react'
import api from '../utils/api'
import CourseCalendar from '../components/CourseCalendar'

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses?fields=list');
        setCourses(res.data.courses);
      } catch(err) {
        setError('ไม่สามารถโหลดข้อมูลได้');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  
  return (
    <div className="min-h-screen bg-[#2d6e5e] w-full">
      <Navbar />

      <div className="w-full">
        <div className="py-12 px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-10">
            หลักสูตรอบรม
          </h2>

          {loading && (
            <p className="text-white text-center">กำลังโหลด...</p>
          )}

          {error && (
            <p className="text-red-300 text-center">{error}</p>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}       // MongoDB ใช้ _id
                title={course.title}
                image={course.image}
                status={course.status} // ส่ง status ไปด้วย
                id={course._id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='mt-4 md:mt-6 pb-12'>
        <h2 className='text-2xl md:text-3xl font-bold text-white text-center mb-4'>
          ปฏิทินรายเดือน
        </h2>
        <CourseCalendar courses={courses} />
      </div>
    </div>
  );
}

export default HomePage