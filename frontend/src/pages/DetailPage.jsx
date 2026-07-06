import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import CourseDetailCard from "../components/CourseDetailCard";
import { formConfigs, extraFieldComponents } from "../config/formConfigs";
import { 
  CourseSelectionField, 
  AgreementField
} from "../components/FormFields";
import api from '../utils/api'

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Redirect ถ้าไม่ได้ login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/detail/${id}` } });
    }
  }, [isAuthenticated, navigate, id]);

  // Fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        const fetchedCourse = res.data.course;
        setCourse(fetchedCourse);

        // Initialize formData หลัง fetch เสร็จ
        const config = fetchCourse ? formConfigs[fetchedCourse.formType] : null;
        const ExtraFieldsComponent = fetchedCourse.formType ? extraFieldComponents[fetchedCourse.formType] : null;

        if (config) {
          const initialData = {};
          config.extraFields.forEach(field => {
            initialData[field] = field.startsWith('has') ? false : '';
          });
          config.requiredFiles.forEach(file => { initialData[file] = null; });
          config.optionalFiles.forEach(file => { initialData[file] = null; });
          initialData.courseType = '';
          initialData.agreeToRules = false;
          setFormData(initialData);
        }
      } catch(err) {
        console.log(err);
        setError('ไม่สามารถโหลดคอร์สนี้ได้');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const config = course?.formType ? formConfigs[course.formType] : null;
  const ExtraFieldsComponent = course?.formType ? extraFieldComponents[course.formType] : null;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setUploadProgress(0);

    try {
      if (course?.courseOptions?.length > 0 && !formData.courseType) {
        alert('กรุณาเลือกหลักสูตร');
        return;
      }

      if (!formData.agreeToRules) {
        alert('กรุณายอมรับเงื่อนไขการฝึกอบรม');
        return;
      }

      const submissionData = new FormData();
      submissionData.append('courseId', id);
      submissionData.append('courseType', formData.courseType);
      submissionData.append('agreeToRules', formData.agreeToRules);

      Object.keys(formData).forEach(key => {
        if (key === 'courseType' || key === 'agreeToRules') return;

        if (formData[key] instanceof File) {
          submissionData.append(key, formData[key]);
        } else if (typeof formData[key] === 'boolean') {
          submissionData.append(key, formData[key].toString());
        } else if (formData[key]) {
          submissionData.append(key, formData[key]);
        }
      });

      const response = await api.post('/registrations', submissionData);

      if (response.data.success) {
        alert('✅ ลงทะเบียนสำเร็จ!');
        navigate('/');
      }
    } catch(error) {
      alert('❌ เกิดข้อผิดพลาด: ' + (error.response?.data?.message || 'ไม่สามารถลงทะเบียนได้'));
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#2d6e5e] flex items-center justify-center">
      <p className="text-white text-xl">กำลังโหลด...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#2d6e5e] flex items-center justify-center">
      <p className="text-red-300 text-xl">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#2d6e5e] w-full">
      <Navbar />
      
      <div className="w-full py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-10">
            ลงทะเบียนหลักสูตร
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Course Details */}
            <CourseDetailCard course={course} />

            {/* Right - Form หรือ ข้อความถ้าไม่มี config */}
            <div className="bg-white rounded-lg shadow-lg p-6">

              {/* User Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">ข้อมูลของคุณ</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-600">ชื่อ:</span> <span className="font-medium">{user?.firstName} {user?.lastName}</span></div>
                  <div><span className="text-gray-600">อีเมล:</span> <span className="font-medium">{user?.email}</span></div>
                  <div><span className="text-gray-600">โทร:</span> <span className="font-medium">{user?.mobilePhone || '-'}</span></div>
                  <div><span className="text-gray-600">โรงเรียน:</span> <span className="font-medium">{user?.school || '-'}</span></div>
                </div>
              </div>

              {/* ถ้าไม่มี config → แสดงข้อความแทน */}
              {course.status === 'full' ? (
                  <div className="text-center py-8">
                      <p className="text-gray-800 text-lg font-medium mb-2">หลักสูตรนี้เต็มแล้ว</p>
                      <p className="text-gray-400 text-sm">ไม่สามารถลงทะเบียนได้ในขณะนี้</p>
                  </div>
              ) : course.status === 'closed' ? (
                  <div className="text-center py-8">
                      <p className="text-gray-800 text-lg font-medium mb-2">ปิดรับสมัครแล้ว</p>
                      <p className="text-gray-400 text-sm">กรุณาติดต่อสถาบันโดยตรง</p>
                  </div>
              ) : !config ? (
                  <div className="text-center py-8">
                      <p className="text-gray-500 text-lg mb-2">⚠️ หลักสูตรนี้ไม่เปิดรับสมัครออนไลน์</p>
                      <p className="text-gray-400 text-sm">กรุณาติดต่อสถาบันโดยตรง</p>
                  </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Course Selection */}
                    {course.subCourses?.length > 0 && (
                      <CourseSelectionField
                        options={course.subCourses}
                        formData={formData}
                        handleChange={handleChange}
                      />
                    )}

                    {/* Extra Fields */}
                    {ExtraFieldsComponent && (
                      <ExtraFieldsComponent
                        formData={formData}
                        handleChange={handleChange}
                        user={user}
                      />
                    )}

                    {/* Agreement */}
                    <AgreementField
                      formData={formData}
                      handleChange={handleChange}
                    />

                    {submitting && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#2d6e5e] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">{uploadProgress}%</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#2d6e5e] text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {submitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันการลงทะเบียน'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;