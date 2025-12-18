import { useState } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import Navbar from '../components/Navbar';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const location = useLocation();

    const from = location.state?.from || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            // Redirect based on role
            if (result.user.role === 'admin') {
              navigate('/admin/dashboard');
            } else {
              navigate(from);
            }
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
    <div className="min-h-screen bg-[#2d6e5e]">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">เข้าสู่ระบบ</h2>
              <p className="text-gray-600 mt-2">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  อีเมล <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                  placeholder="example@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  รหัสผ่าน <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#2d6e5e] cursor-pointer text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  loading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-opacity-90 hover:shadow-lg'
                }`}
              >
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ยังไม่มีบัญชี?{' '}
                <Link 
                  to="/register" 
                  className="text-[#2d6e5e] font-medium hover:underline"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;