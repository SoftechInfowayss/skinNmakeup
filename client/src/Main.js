import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import AuthPage from './pages/Auth';
import AdminDashboard from './pages/Admindashboard';
import AdminLogin from './pages/Adminlogin';
import AdminAddProduct from './pages/Adminaddproduct';
import Adminuser from './pages/Adminuser';
import Adminqueries from './pages/Adminqueries';
import Adminproduct from './pages/Adminproducts'
function Main() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route path="addproduct" element={<AdminAddProduct />} />
          <Route path="users" element={<Adminuser />} />
          <Route path="queries" element={<Adminqueries />} />
          <Route path="products" element={<Adminproduct />} />
          {/* Add other admin routes here */}
          <Route index element={<div className="p-6"><h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Main;