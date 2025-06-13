import React, { memo, useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import {  useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react'
import { ArrowRight, Sparkles } from 'lucide-react';
import CategoriesPage from './Categories'; // Importing the previous CategoriesPage component
import CatHeroSection from '../components/CategoryHero';

// Sample category data with images (replace with actual image URLs in a real app)
const TypewriterText = ({ text, delay }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index, displayedText, text]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="inline-block w-1 h-6 bg-pink-500 ml-1"
      />
    </motion.span>
  );
};
const categories = [
  {
    name: 'Skincare',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
    description: 'Nourish your skin with the best products.',
  },
  {
    name: 'Makeup',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop',
    description: 'Enhance your beauty with our makeup collection.',
  },
  {
    name: 'Haircare',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
    description: 'Transform your hair with premium care.',
  },
  {
    name: 'Fragrances',
    image: 'https://images.unsplash.com/photo-1587017539504-6d87b37d8970?q=80&w=2070&auto=format&fit=crop',
    description: 'Discover captivating scents.',
  },
];

const CategoriesHome = () => {
   const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 300], [0, -50]); // Parallax effect

  // Featured products for marquee
  const featuredProducts = [
    { name: 'Luxury Lipstick', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Eternal Perfume', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Glow Serum', image: 'https://images.unsplash.com/photo-1625772299848-391b6a48d7da?q=80&w=2070&auto=format&fit=crop' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  // If a category is selected, render the CategoriesPage with the selected category
  if (selectedCategory) {
    return <CategoriesPage initialCategory={selectedCategory} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <CatHeroSection />
      {/* Categories Section */}
       <section className="container mx-auto max-w-7xl px-4 py-20 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2
          className="text-5xl font-bold text-gray-800 mb-4 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Explore Our Categories
        </h2>
        <p
          className="text-lg text-gray-600 max-w-xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Find the perfect products to elevate your beauty routine with our curated selection.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{ y: yTransform }}
            className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-white/30 backdrop-blur-lg border border-pink-100/50"
            onClick={() => setSelectedCategory(category.name.toLowerCase())}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 15px 30px rgba(236, 72, 153, 0.2)',
            }}
          >
            {/* 3D Tilt Effect */}
            <motion.div
              className="w-full h-full"
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
              {/* Content */}
              <motion.div
                className="absolute bottom-0 p-6 text-white w-full"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                <h3
                  className="text-2xl font-semibold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {category.name}
                </h3>
                <p
                  className="text-sm mb-4 text-gray-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {category.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center text-pink-300 font-medium hover:text-pink-200 transition-colors"
                >
                  Explore
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.button>
              </motion.div>
              {/* Sparkle Effect on Hover */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles size={24} className="text-pink-300" />
              </motion.div>
            </motion.div>
            {/* Glowing Border on Hover */}
            <motion.div
              className="absolute inset-0 border-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 bg-pink-200 rounded-full opacity-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full opacity-10"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
    </section>

      {/* Call to Action Section */}
      <section className="bg-pink-600 text-white py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Beauty Routine?</h3>
            <p className="text-lg mb-6 max-w-xl mx-auto">
              Join thousands of beauty enthusiasts and discover products that make you feel amazing.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-pink-600 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedCategory('all')}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm">© 2025 Beauty Hub. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="/about" className="hover:text-pink-300 transition-colors">About</a>
            <a href="/contact" className="hover:text-pink-300 transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-pink-300 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(CategoriesHome);