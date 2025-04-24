import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

export default memo(function Footer() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Sign In / Sign Up', path: '/auth' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, path: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, path: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, path: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaPinterest />, path: 'https://pinterest.com', label: 'Pinterest' },
  ];

  // Animation variants for staggered nav items
  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
  };

  // Bubble animation CSS
  const bubbleStyles = `
    .bubbles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    }
    .bubble {
      position: absolute;
      bottom: -100px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
      border-radius: 50%;
      opacity: 0.4;
      animation: rise 10s infinite ease-in;
    }
    .bubble:nth-child(1) {
      width: 40px;
      height: 40px;
      left: 10%;
      animation-duration: 8s;
    }
    .bubble:nth-child(2) {
      width: 20px;
      height: 20px;
      left: 20%;
      animation-duration: 12s;
      animation-delay: 1s;
    }
    .bubble:nth-child(3) {
      width: 60px;
      height: 60px;
      left: 35%;
      animation-duration: 10s;
      animation-delay: 2s;
    }
    .bubble:nth-child(4) {
      width: 80px;
      height: 80px;
      left: 50%;
      animation-duration: 15s;
      animation-delay: 0.5s;
    }
    .bubble:nth-child(5) {
      width: 30px;
      height: 30px;
      left: 70%;
      animation-duration: 9s;
      animation-delay: 3s;
    }
    .bubble:nth-child(6) {
      width: 50px;
      height: 50px;
      left: 85%;
      animation-duration: 11s;
      animation-delay: 1.5s;
    }
    @keyframes rise {
      0% {
        bottom: -100px;
        transform: translateX(0);
        opacity: 0.4;
      }
      50% {
        opacity: 0.6;
      }
      100% {
        bottom: 100%;
        transform: translateX(50px);
        opacity: 0;
      }
    }
  `;

  return (
    <footer className="bg-gradient-to-b from-rose-800 via-rose-900 to-black text-white relative overflow-hidden">
      {/* Inline CSS for bubble animations */}
      <style>{bubbleStyles}</style>
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-600/30 to-transparent pointer-events-none" />

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-pink-700 via-rose-700 to-rose-800 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] animate-pulse-slow" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-5xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-white drop-shadow-2xl"
            >
              Join Our Beauty Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.95 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-xl mb-12 text-rose-100 leading-relaxed max-w-2xl mx-auto"
            >
              Subscribe to our newsletter for exclusive offers, beauty tips, and the latest product launches
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-5 max-w-md mx-auto sm:max-w-3xl">
              <motion.input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-6 py-4 rounded-2xl text-gray-900 bg-white/95 focus:outline-none focus:ring-4 focus:ring-rose-300/60 shadow-xl hover:shadow-2xl transition-all duration-700 placeholder-gray-500 font-medium"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileFocus={{ scale: 1.03, boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
              />
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-200 to-pink-200 text-rose-800 px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-700 tracking-wide"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Subscribe
              </motion.button>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-sm mt-8 text-rose-200/80"
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer Links and Social Media */}
      <section className="py-24 bg-gradient-to-b from-rose-900 to-black relative">
        <div className="bubbles">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-10 tracking-wider text-rose-100 bg-clip-text bg-gradient-to-r from-rose-200 to-white relative">
                Explore
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-rose-200 to-transparent rounded-full" />
              </h3>
              <ul className="space-y-5">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    variants={navItemVariants}
                    viewport={{ once: true }}
                    whileHover={{ x: 20, scale: 1.1, color: '#FECDD3' }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      to={item.path}
                      className="text-rose-200 hover:text-white text-lg font-medium transition-colors duration-500 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-200 transition-all duration-500 group-hover:w-full" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media - Fixed Section */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-10 tracking-wider text-rose-100 bg-clip-text bg-gradient-to-r from-rose-200 to-white relative">
                Connect With Us
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-rose-200 to-transparent rounded-full" />
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                    whileHover={{ scale: 1.5, rotate: 20, boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)' }}
                    whileTap={{ scale: 0.9 }}
                    className="text-rose-200 hover:text-white p-4 rounded-full bg-rose-800/70 hover:bg-rose-700/90 transition-all duration-700 shadow-lg hover:shadow-2xl flex items-center justify-center"
                  >
                    <span className="sr-only">{social.label}</span>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-10 tracking-wider text-rose-100 bg-clip-text bg-gradient-to-r from-rose-200 to-white relative">
                Get In Touch
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-rose-200 to-transparent rounded-full" />
              </h3>
              <motion.p
                whileHover={{ x: 15, color: '#FECDD3', scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-rose-200 mb-6 text-lg font-medium"
              >
                Email: support@glamourhaven.com
              </motion.p>
              <motion.p
                whileHover={{ x: 15, color: '#FECDD3', scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-rose-200 mb-6 text-lg font-medium"
              >
                Phone: +1 (800) 123-4567
              </motion.p>
              <motion.p
                whileHover={{ x: 15, color: '#FECDD3', scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-rose-200 text-lg font-medium"
              >
                Address: 123 Beauty Lane, Glamour City
              </motion.p>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-10 tracking-wider text-rose-100 bg-clip-text bg-gradient-to-r from-rose-200 to-white relative">
                Our Mission
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-rose-200 to-transparent rounded-full" />
              </h3>
              <p className="text-rose-200 text-lg leading-relaxed font-medium">
                Empowering beauty enthusiasts with premium products and inspiring confidence through elegance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="py-10 bg-gradient-to-r from-rose-950 to-black text-center relative overflow-hidden">
        <div className="bubbles">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_80%)] animate-pulse-slow"
        />
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-base text-rose-100 font-medium relative z-10 bg-clip-text bg-gradient-to-r from-rose-200 to-white tracking-wide"
        >
          © {new Date().getFullYear()} Glamour Haven. All rights reserved.
        </motion.p>
      </section>
    </footer>
  );
});