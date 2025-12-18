import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-[#2d6e5e] text-white' : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4 px-4">เมนูผู้ดูแลระบบ</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/admin/dashboard"
                  className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/admin/dashboard')}`}
                >
                  📝 จัดการใบสมัคร
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/users"
                  className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/admin/users')}`}
                >
                  👥 จัดการผู้ใช้
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/reports"
                  className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/admin/reports')}`}
                >
                  📈 รายงาน
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;