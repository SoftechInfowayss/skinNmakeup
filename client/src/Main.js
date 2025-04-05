import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Categories from './pages/Categories';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
 
// import Wishlist from './pages/Wishlist';
// import Cart from './pages/Cart';
// import Account from './pages/Account';

function Main() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />
        {/* <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} /> */}
      </Routes>
    </Router>
  );
}

export default Main;