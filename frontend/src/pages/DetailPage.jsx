import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import CourseDetailCard from "../components/CourseDetailCard";
import { formConfigs } from "../config/formConfigs";
import { 
  CourseSelectionField, 
  ScoutPreviousTrainingFields,
  RedCrossPreviousTrainingFields,
  AgreementField
} from "../components/FormFields";
import logo_scout from '../assets/logoลูกเสือ.jpg'
import logo_yuwa from '../assets/logoยุว.jpg'

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const config = formConfigs[id];
    const courses = [{
      id: 10,
      title: "ฝึกอบรมบุคลากรทางการลูกเสือ",
      image: logo_scout,
      date: "13-19 กุมภาพันธ์ 2569, 18-24 เมษายน 2569, 3-9 พฤษภาคม 2569",
      location: "ค่ายลูกเสือกรุงเทพมหานคร (จอม-ประจญ นพเกตุ) อ.แปลงยาว จ.ฉะเชิงเทรา",
      fullDescription: "หลักสูตรนี้จัดขึ้นเพื่อพัฒนาบุคลากรทางการลูกเสือให้มีความรู้ความเข้าใจในหลักการลูกเสือสากล เทคนิคการจัดกิจกรรมลูกเสือแต่ละระดับ การใช้เครื่องหมายและเครื่องแบบลูกเสือ ทักษะการเอาชีวิตรอดในธรรมชาติ การผูกเงื่อน การตั้งค่าย การปฐมพยาบาล และการพัฒนาเยาวชนด้วยกิจกรรมลูกเสือให้เป็นคนดีและพลเมืองที่มีคุณภาพของสังคม"    },
    {
      id: 11,
      title: "ฝึกอบรมผู้บังคับบัญชายุวกาชาด",
      image: logo_yuwa,
      date: "9-13 มีนาคม 2569, 26 เมษายน - 1 พฤษภาคม 2569, 1-7 สิงหาคม 2569",
      location: "ค่ายลูกเสือกรุงธน เขตทุ่งครุ",
      fullDescription: "หลักสูตรนี้จัดขึ้นเพื่อพัฒนาความรู้และทักษะของผู้บังคับบัญชายุวกาชาด ครอบคลุมเนื้อหาเกี่ยวกับหลักการและวิธีการยุวกาชาด การจัดกิจกรรมสร้างสรรค์สำหรับเยาวชน การปฐมพยาบาลและสุขภาพอนามัย การพัฒนาบุคลิกภาพและภาวะผู้นำ รวมถึงการบริหารจัดการกิจกรรมยุวกาชาดให้มีประสิทธิภาพและปลอดภัย"
    }
  ];

  const initializeFormData = () => {
    const initialData = {};
    Object.keys(config.fields).forEach(fieldName => {
      const field = config.fields[fieldName];
      initialData[fieldName] = field.type === 'checkbox' ? false : '';
    })
    return initialData;
  };

  const [formData, setFormData] = useState(initializeFormData());

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/detail/${id}` } });
    }
  }, [isAuthenticated, navigate, id]);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submissionData = new FormData();

        submissionData.append('userId', user.id);
        submissionData.append('courseId', id);

        Object.keys(formData).forEach(key => {
          if (formData[key] instanceof File) {
            submissionData.append(key, formData[key]);
          } else if (typeof formData[key] === 'boolean') {
            submissionData.append(key, formData[key].toString());
          } else if (formData[key]) {
            submissionData.append(key, formData[key]);
          }
        });
        console.log('Form submitted:', formData);
    };

    const currentCourse = courses.find(c => c.id === parseInt(id));

    return (
    <div className="min-h-screen bg-[#2d6e5e] w-full">
      <Navbar />
      
      <div className="w-full py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-10">
            ลงทะเบียนหลักสูตร
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Course Details */}
            <CourseDetailCard course={currentCourse} />

            {/* Right Side - Registration Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              
              {/* User Info Display - READ ONLY */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">ข้อมูลของคุณ</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-600">ชื่อ:</span> <span className="font-medium">{user?.firstName} {user?.lastName}</span></div>
                  <div><span className="text-gray-600">อีเมล:</span> <span className="font-medium">{user?.email}</span></div>
                  <div><span className="text-gray-600">โทร:</span> <span className="font-medium">{user?.mobilePhone || '-'}</span></div>
                  <div><span className="text-gray-600">โรงเรียน:</span> <span className="font-medium">{user?.school || '-'}</span></div>
                </div>
                <p className="text-xs text-blue-700 mt-2">💡 แก้ไขข้อมูลได้ที่หน้าโปรไฟล์</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                แบบฟอร์มลงทะเบียน
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Selection */}
                <CourseSelectionField 
                  options={config.courseOptions}
                  formData={formData}
                  handleChange={handleChange}
                />               

                {/* Previous Training - Different for each type */}
                {config.type === 'scout' && (
                  <ScoutPreviousTrainingFields 
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}

                {config.type === 'redcross' && (
                  <RedCrossPreviousTrainingFields 
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}

                {/* Agreement */}
                <AgreementField 
                  formData={formData}
                  handleChange={handleChange}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#2d6e5e] text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 hover:shadow-lg transition-all duration-300"
                >
                  ยืนยันการลงทะเบียน
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;