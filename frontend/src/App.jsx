import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="detail/:id" element={<DetailPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
