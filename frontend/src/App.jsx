import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCoursePage from './pages/AdminCoursePage';
import MyRegistrationPage from './pages/MyRegistrationPage';
import EditProfilePage from './pages/EditProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import FeedbackWidget from './components/FeedbackWidget';
import FeedbackAdminPage from './pages/FeedbackAdminPage';
import AdminUserCoursesPage from './pages/AdminUserCoursesPage';

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="detail/:id" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
          <Route path='/admin/dashboard' element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path='/admin/courses' element={<AdminCoursePage />} />
          <Route path='/admin/feedbacks' element={<ProtectedRoute adminOnly={true}><FeedbackAdminPage /></ProtectedRoute>} />
          <Route path='/admin/users' element={ <ProtectedRoute adminOnly={true}><AdminUserCoursesPage /></ProtectedRoute>}/>
          <Route path='/my-registrations' element={<ProtectedRoute><MyRegistrationPage /></ProtectedRoute>} />
          <Route path='/profile/edit' element={ <ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        </Routes>
        <FeedbackWidget />
    </AuthProvider>
  )
}

export default App
