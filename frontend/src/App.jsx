import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="detail/:id" element={<DetailPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
