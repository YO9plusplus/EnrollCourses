import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  PersonalInfoFields, 
  ContactFields, 
  EducationFields,
  WorkInfoFields,
  HealthFields 
} from '../components/FormFields';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    // Auth
    email: '',
    password: '',
    confirmPassword: '',
    
    // Personal Info
    title: '',
    firstName: '',
    lastName: '',
    religion: '',
    birthDate: '',
    age: '',
    idCard: '',
    
    // Contact
    mobilePhone: '',
    lineId: '',
    
    // Education
    education: '',
    major: '',
    
    // Work
    position: '',
    academicLevel: '',
    school: '',
    district: '',
    schoolPhone: '',
    
    // Health
    healthCondition: '',
    foodRestrictions: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.email) newErrors.email = 'กรุณากรอกอีเมล';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    else if (formData.password.length < 6) newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }
    
    if (!formData.firstName) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formData.lastName) newErrors.lastName = 'กรุณากรอกนามสกุล';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);

    if (result.success) {
      navigate('/');
    } else {
      if (result.errors) {
        const backendErrors = {};
        result.errors.forEach(err => {
          backendErrors[err.path] = err.msg;
        });
        setErrors(backendErrors);
      } else {
        setErrors({ general: result.message });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#2d6e5e]">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">สมัครสมาชิก</h2>
              <p className="text-gray-600 mt-2">กรุณากรอกข้อมูลเพื่อสร้างบัญชี</p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Credentials */}
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลเข้าสู่ระบบ</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      อีเมล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-[#2d6e5e]'
                      }`}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        รหัสผ่าน <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.password ? 'border-red-500' : 'border-gray-300 focus:ring-[#2d6e5e]'
                        }`}
                        placeholder="••••••••"
                      />
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:ring-[#2d6e5e]'
                        }`}
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <PersonalInfoFields 
                formData={formData} 
                handleChange={handleChange} 
                showAge={true}
              />

              {/* Contact Info */}
              <ContactFields 
                formData={formData} 
                handleChange={handleChange} 
              />

              {/* Education Info */}
              <EducationFields 
                formData={formData} 
                handleChange={handleChange} 
              />

              {/* Work Info */}
              <WorkInfoFields 
                formData={formData} 
                handleChange={handleChange}
                phoneFieldName="schoolPhone"
              />

              {/* Health Info */}
              <HealthFields 
                formData={formData} 
                handleChange={handleChange}
                showHealthCondition={true}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#2d6e5e] text-white py-3 px-6 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90 hover:shadow-lg'
                }`}
              >
                {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                มีบัญชีอยู่แล้ว?{' '}
                <Link to="/login" className="text-[#2d6e5e] font-medium hover:underline">
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;