import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import AddMedicine from './components/AddMedicine';
import UpdateMedicine from './components/UpdateMedicine';
import ViewMedicine from './components/ViewMedicine';
import Billing from './components/Billing';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/add-medicine" element={<AddMedicine />} />        
        <Route path="/update-medicine/:id" element={<UpdateMedicine />} /> {/* 💥 This is needed */}
        <Route path="/view-medicine" element={<ViewMedicine />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </Router>
  );
}

export default App;
