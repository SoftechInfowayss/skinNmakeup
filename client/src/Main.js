import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Categories from './pages/Categories';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import AuthPage from './pages/Auth';
 import AdminDashboard from './pages/Admindashboard';
 import AdminLogin from './pages/Adminlogin';
import AdminAddProduct from './pages/Adminaddproduct';
function Main() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/adminaddproduct" element={<AdminAddProduct/>} />
        {/* <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} /> */}
      </Routes>
    </Router>
  );
}

export default Main;