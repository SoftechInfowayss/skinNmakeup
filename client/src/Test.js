import React from "react";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-200 min-h-screen flex flex-col items-center justify-center">
      <header className="w-full flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-pink-600">GlowUp Beauty</h1>
        <nav>
          <ul className="flex space-x-6 text-gray-700">
            <li className="hover:text-pink-600 cursor-pointer">Home</li>
            <li className="hover:text-pink-600 cursor-pointer">Products</li>
            <li className="hover:text-pink-600 cursor-pointer">Services</li>
            <li className="hover:text-pink-600 cursor-pointer">Contact</li>
          </ul>
        </nav>
      </header>
      
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-center px-6 md:px-20"
      >
        <h2 className="text-5xl font-extrabold text-gray-900 mt-12">Enhance Your Natural Beauty</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the best skincare and makeup products curated just for you. Transform your routine with premium beauty solutions.
        </p>
        <Button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-600">
          Shop Now
        </Button>
      </motion.section>
      
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900">Organic Skincare</h3>
          <p className="text-gray-600 mt-2">Nourish your skin with our organic and natural skincare products.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900">Makeup Essentials</h3>
          <p className="text-gray-600 mt-2">Enhance your beauty with our premium makeup collection.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900">Beauty Tips & Tutorials</h3>
          <p className="text-gray-600 mt-2">Learn from experts and refine your beauty routine.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;