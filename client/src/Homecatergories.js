import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import perfume from "./image/perfume3.jpg"
const categories = [
    {
      name: "Skincare",
      description: "Nourish your skin with our premium formulas",
      icon: "💆‍♀️",
      bg: "from-pink-100 to-rose-50",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1470&auto=format&fit=crop",
      
      accent: "bg-rose-500"
    },
    {
      name: "Makeup",
      description: "Enhance your natural beauty",
      icon: "💄",
      bg: "from-rose-50 to-pink-100",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1470&auto=format&fit=crop",
      accent: "bg-pink-400"
    },
    {
      name: "Haircare",
      description: "Luxurious treatments for all hair types",
      icon: "🧴",
      bg: "from-pink-200 to-rose-100",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1587&auto=format&fit=crop",
      accent: "bg-rose-600"
    },
    {
      name: "Fragrance",
      description: "Scents that make a statement",
      icon: "🌸",
      bg: "from-rose-100 to-pink-50",
      image: perfume,
      accent: "bg-pink-300"
    }
];

export default memo(function Homecatergories() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-br from-white via-pink-50 to-rose-50 overflow-visible">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-24 relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 drop-shadow-lg leading-tight">
              Shop By Category
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto tracking-wide font-light">
              Explore our luxurious beauty collections crafted just for you
            </p>
            <motion.div
              className="mt-4 h-1 w-24 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ y: -12, scale: 1.02 }}
                viewport={{ once: true }}
                className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-rose-200/30 bg-white/50 backdrop-blur-sm"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bg} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Category Content */}
                <div className="relative z-10 h-full flex flex-col p-10 text-gray-800">
                  <motion.span 
                    className="text-6xl mb-6 drop-shadow-md"
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 group-hover:from-rose-600 group-hover:to-pink-500 transition-all duration-300 drop-shadow-sm">
                    {category.name}
                  </h3>
                  <p className="mb-8 text-gray-700 text-lg group-hover:text-gray-900 font-medium transition-colors duration-300">
                    {category.description}
                  </p>
                  <motion.button 
                    className="mt-auto self-start bg-white text-rose-600 px-7 py-3 rounded-full font-semibold shadow-lg border border-rose-200/70 transition-all duration-300 tracking-wide"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: category.accent.replace('bg-', '#'),
                      color: '#ffffff',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      borderColor: 'transparent'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop Now
                  </motion.button>
                </div>
                
                {/* Category Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-115 group-hover:rotate-2 transition-transform duration-700 ease-in-out brightness-70 group-hover:brightness-85" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
                </div>
                
                {/* Decorative Elements */}
                <div className={`absolute top-6 right-6 w-24 h-24 rounded-full ${category.accent}/25 group-hover:${category.accent}/50 group-hover:scale-125 transition-all duration-500`}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent group-hover:h-3 transition-all duration-300"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-pink-300 to-transparent group-hover:w-2 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});