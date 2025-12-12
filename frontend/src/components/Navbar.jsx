import logo from '../assets/logo.png'  // Change to your actual logo filename
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-full mx-auto">
        <div className="flex justify-start items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-4 ml-4">
            <img src={logo} alt="Logo" className="h-12 w-auto cursor-pointer" onClick={handleHome} />
            <h2 className="text-(--thai-green) text-2xl font-bold relative top-1">สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร</h2>
          </div>

          {/* Auth Buttons */}
            {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                สวัสดี, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;