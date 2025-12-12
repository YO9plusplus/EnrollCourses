import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CourseDetailCard from "../components/CourseDetailCard";
import { formConfigs } from "../config/formConfigs";
import { 
  CourseSelectionField, 
  PersonalInfoFields, 
  EducationFields,
  ContactFields,
  WorkInfoFields,
  ScoutPreviousTrainingFields,
  RedCrossPreviousTrainingFields,
  HealthFields,
  AgreementField
} from "../components/FormFields";
import logo_scout from '../assets/logoลูกเสือ.gif'
import logo_yuwa from '../assets/logoยุว.gif'

const DetailPage = () => {
  const { id } = useParams();

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
    });
    return initialData;
  }

  const [formData, setFormData] = useState(initializeFormData());

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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

                {/* Personal Info */}
                <PersonalInfoFields 
                  formData={formData}
                  handleChange={handleChange}
                  showAge={config.fields.age !== undefined}
                />

                {/* Contact Info */}
                <ContactFields 
                  formData={formData}
                  handleChange={handleChange}
                />

                {/* Education (only for redcross) */}
                {config.type === 'redcross' && (
                  <EducationFields 
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}

                {/* Work Info */}
                <WorkInfoFields 
                  formData={formData}
                  handleChange={handleChange}
                  phoneFieldName={config.type === 'redcross' ? 'schoolPhone' : 'officePhone'}
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

                {/* Health and Food */}
                <HealthFields 
                  formData={formData}
                  handleChange={handleChange}
                  showHealthCondition={config.type === 'scout'}
                />

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