import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
// import Categories from './pages/Categories';
import Aboutus from './Aboutus';
import Contactus from './Contactus';
 
// import Wishlist from './pages/Wishlist';
// import Cart from './pages/Cart';
// import Account from './pages/Account';

function App() {
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

export default App;