import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import Dashboard from './Pages/Dashboard/Dashboard';
import CourseRegistration from './Pages/CourseRegistration/CourseRegistration';
import Admin from './Pages/Admin/Admin';
import CourseFramework from './Pages/CourseFramework/CourseFramework';
import UserProfile from './Pages/Profile/UserProfile';
import Grades from './Pages/Grades/Grades';
import Calendar from './Pages/Calendar/Calendar';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/authentication' replace />} />
      <Route path='/authentication' element={<Authentication />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/dang-ky-hoc-phan' element={<CourseRegistration />} />
      <Route path='/dashboard/chuong-trinh-khung' element={<CourseFramework />} />
      <Route path='/dashboard/trang-ca-nhan' element={<UserProfile />} />
      <Route path='/dashboard/ket-qua-hoc-tap' element={<Grades />} />
      <Route path='/dashboard/lich-hoc' element={<Calendar />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
  );
}

export default App;
