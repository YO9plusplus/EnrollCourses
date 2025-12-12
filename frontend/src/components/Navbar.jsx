import logo from '../assets/logo.png'  // Change to your actual logo filename
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;