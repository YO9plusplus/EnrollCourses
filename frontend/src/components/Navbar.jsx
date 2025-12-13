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
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Title */}
          <div className="flex items-center gap-4 ml-4">
            <img src={logo} alt="Logo" className="h-12 w-auto cursor-pointer" onClick={handleHome} />
            <h2 className="text-(--thai-green) text-2xl font-bold relative top-1">สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร</h2>
          </div>

          {/* Right side - Logout button */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-4 mr-4 mt-1">
              <span className="text-gray-700 font-medium mt-1.5">
                สวัสดี, {user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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