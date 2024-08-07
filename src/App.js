import './App.css';
import { DashBoard } from './employees/DashBoard';
import { EmpApply } from './employees/EmpApply';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HrDashboard } from './HR/HrDashboard';
import { StatusCheck } from './employees/StatusCheck';
import { HrLogin } from './HR/HrLogin';
import ProtectedRoute from './HR/ProtectedRoute';
import { AuthProvider } from './HR/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/status" element={<StatusCheck />} />
          <Route path="/" element={<DashBoard />} />
          <Route path="/Empapply" element={<EmpApply />} />
          <Route path="/hrlogin" element={<HrLogin />} />
          <Route 
            path="/hrdashboard" 
            element={
              <ProtectedRoute>
                <HrDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
