import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import hairmask from "./image/hairmask.jpg"
import lipstick from "./image/lipstick.jpg"
import perfume from "./image/perfume.jpg"
import serum from "./image/serum.jpg"
const featuredProducts = [
    {
      name: "24H Hydra Glow Serum",
      price: "$49.99",
      originalPrice: "$59.99",
      image: serum,
      category: "Skincare",
      rating: 4.8,
      reviews: 124,
      discount: "20% OFF"
    },
    {
      name: "Matte Liquid Lipstick",
      price: "$24.99",
      originalPrice: "$29.99",
      image: lipstick,
      category: "Makeup",
      rating: 4.5,
      reviews: 89,
      discount: "15% OFF"
    },
    {
      name: "Repairing Hair Mask",
      price: "$32.99",
      originalPrice: "$39.99",
      image: hairmask,
      category: "Haircare",
      rating: 4.9,
      reviews: 156,
      discount: "18% OFF"
    },
    {
      name: "Eau de Parfum",
      price: "$89.99",
      originalPrice: "$109.99",
      image: perfume,
      category: "Fragrance",
      rating: 4.7,
      reviews: 98,
      discount: "25% OFF"
    }
];

export default memo(function Homefeaturedproducts() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Products */}
      <section className="py-28 bg-gradient-to-br from-white via-pink-50 to-rose-50 overflow-visible">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-24 relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 drop-shadow-xl leading-tight">
              Featured Products
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto tracking-wide font-light">
              Discover the season's most loved beauty essentials
            </p>
            <motion.div
              className="mt-6 h-1 w-32 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.25, ease: "easeOut" }}
                whileHover={{ y: -12, scale: 1.05 }}
                viewport={{ once: true }}
                className="group relative bg-white/95 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-rose-200/40 backdrop-blur-md"
              >
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-120 group-hover:rotate-2 brightness-70 group-hover:brightness-85" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500"></div>
                  <motion.span 
                    className="absolute top-4 right-4 bg-rose-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.category}
                  </motion.span>
                  {/* Discount Badge */}
                  <motion.span 
                    className="absolute top-4 left-4 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.discount}
                  </motion.span>
                  {/* Rating */}
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-lg px-4 py-2 rounded-full flex items-center gap-2 border border-rose-200/70 shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">{product.rating} ({product.reviews})</span>
                  </motion.div>
                </div>
                <div className="p-8 relative">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors duration-300 tracking-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-rose-600 font-bold text-lg">{product.price}</p>
                    <p className="text-gray-500 line-through text-sm">{product.originalPrice}</p>
                  </div>
                  <motion.button 
                    className="w-full bg-gradient-to-r from-pink-100 to-rose-100 text-rose-600 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-rose-200/70 shadow-lg"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundImage: 'linear-gradient(to right, #e91e63, #f44336)',
                      color: '#ffffff',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      borderColor: 'transparent'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.button>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-300/25 rounded-full -translate-x-1/3 -translate-y-1/3 group-hover:bg-rose-400/40 group-hover:scale-125 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent group-hover:h-2 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <motion.button 
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-12 py-4 rounded-full font-semibold shadow-xl border border-rose-200/40 tracking-wider"
              whileHover={{ 
                scale: 1.1, 
                backgroundImage: 'linear-gradient(to right, #e91e63, #f44336)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
                borderColor: 'transparent'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Products
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
});