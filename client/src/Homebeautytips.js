import React, { memo } from 'react'
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiArrowRight, FiArrowLeft, FiBookmark, FiShare2, FiHeart } from 'react-icons/fi';
import skincare from "./image/skincare1.jpg"
import spring from "./image/spring.jpg"
import perfume from "./image/perfume4.jpg"
import hair from "./image/hair2.jpg"
import sun from "./image/sun.jpg"
import morning from "./image/morning.jpg"
const beautyTips = [
  {
    title: "5-Step Night Routine for Glowing Skin",
    category: "SKINCARE",
    image: skincare,
    excerpt: "Discover the perfect evening ritual to wake up with radiant skin. Our dermatologist-approved routine will transform your complexion.",
    readTime: "5 min read",
    author: "Dr. Sarah Johnson",
    date: "May 15, 2023"
  },
  {
    title: "Spring 2025 Makeup Trends to Try",
    category: "MAKEUP",
    image: spring,
    excerpt: "From bold lips to natural glow, these are the looks dominating this season. Get runway-ready with these pro techniques.",
    readTime: "7 min read",
    author: "Maya Rodriguez",
    date: "April 2, 2025"
  },
  {
    title: "How to Choose Your Signature Scent",
    category: "FRAGRANCE",
    image: perfume,
    excerpt: "Find the perfect fragrance that matches your personality and style. Our fragrance expert reveals the secrets to scent pairing.",
    readTime: "4 min read",
    author: "Olivier Dubois",
    date: "March 28, 2023"
  },
  {
    title: "DIY Hair Masks for All Hair Types",
    category: "HAIRCARE",
    image: hair,
    excerpt: "Natural ingredients to transform your hair at home. These salon-quality treatments cost pennies to make.",
    readTime: "6 min read",
    author: "Nia Williams",
    date: "May 5, 2023"
  },
  {
    title: "The Ultimate Guide to Sun Protection",
    category: "SKINCARE",
    image: sun,
    excerpt: "Everything you need to know about SPF and sun safety. Protect your skin with these evidence-based tips.",
    readTime: "8 min read",
    author: "Dr. Michael Chen",
    date: "June 10, 2023"
  },
  {
    title: "10-Minute Makeup for Busy Mornings",
    category: "MAKEUP",
    image: morning,
    excerpt: "Quick and easy routine that makes you look polished in minutes. Perfect for when you're running late.",
    readTime: "3 min read",
    author: "Emma Laurent",
    date: "May 22, 2023"
  },
  {
    title: "The Science Behind Retinol",
    category: "SKINCARE",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1587&auto=format&fit=crop",
    excerpt: "How this powerhouse ingredient transforms your skin. Dermatologists explain how to use it properly.",
    readTime: "9 min read",
    author: "Dr. Lisa Park",
    date: "April 18, 2023"
  }
];

const categoryColors = {
  SKINCARE: 'bg-pink-600',
  MAKEUP: 'bg-purple-600',
  FRAGRANCE: 'bg-amber-600',
  HAIRCARE: 'bg-blue-600'
};

export default memo(function Homebeautytips() {
  const scrollContainer = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Beauty Tips Section */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-pink-100 text-pink-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
              Beauty Journal
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
              Discover Beauty Secrets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert advice, trending techniques, and transformative tips from our beauty specialists
            </p>
          </motion.div>

          <div className="relative group">
            {/* Navigation Arrows - Enhanced */}
            <motion.button 
              onClick={scrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:bg-pink-50 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 hover:shadow-2xl hover:scale-110 border border-gray-100"
              aria-label="Scroll left"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft className="text-pink-600 text-xl" />
            </motion.button>
            
            <motion.button 
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:bg-pink-50 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-6 group-hover:translate-x-0 hover:shadow-2xl hover:scale-110 border border-gray-100"
              aria-label="Scroll right"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowRight className="text-pink-600 text-xl" />
            </motion.button>

            {/* Scrollable Container */}
            <div 
              ref={scrollContainer}
              className="flex overflow-x-auto pb-10 scrollbar-hide space-x-6 pl-2 pr-2 -mx-2"
            >
              {beautyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, rotateY: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  className="flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: hoveredCard === index ? 'translateY(-8px) rotateY(0deg)' : 'translateY(0) rotateY(0deg)',
                    perspective: '1000px'
                  }}
                >
                  {/* Card shine effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 to-transparent opacity-0"
                      animate={{
                        opacity: hoveredCard === index ? [0, 0.3, 0] : 0,
                        left: hoveredCard === index ? ['-100%', '150%', '150%'] : '-100%'
                      }}
                      transition={{ 
                        duration: 1.2,
                        times: [0, 0.5, 1]
                      }}
                    />
                  </div>
                  
                  {/* Card ribbon */}
                  <div className={`absolute top-4 left-0 ${categoryColors[tip.category] || 'bg-pink-600'} text-white text-xs font-bold px-3 py-1 rounded-r-full shadow-sm z-10`}>
                    {tip.category}
                  </div>
                  
                  {/* Image container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img 
                      src={tip.image} 
                      alt={tip.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: hoveredCard === index ? 1.05 : 1 
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    
                    {/* Card actions */}
                    <motion.div 
                      className="absolute top-4 right-4 flex space-x-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: hoveredCard === index ? 1 : 0,
                        y: hoveredCard === index ? 0 : -10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button 
                        className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiBookmark className="w-4 h-4" />
                      </motion.button>
                      <motion.button 
                        className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiShare2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button 
                        className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiHeart className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Card content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{tip.author}</span>
                        <span className="mx-2">•</span>
                        <span>{tip.date}</span>
                      </div>
                      <motion.h3 
                        className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover/card:text-pink-600 transition-colors duration-300"
                        whileHover={{ x: 2 }}
                      >
                        <a href="#" className="block">{tip.title}</a>
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 mb-4 line-clamp-2"
                        initial={{ opacity: 1 }}
                        animate={{
                          opacity: hoveredCard === index ? 0.9 : 1
                        }}
                      >
                        {tip.excerpt}
                      </motion.p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-500">{tip.readTime}</span>
                      <motion.a 
                        href="#" 
                        className="text-pink-600 hover:text-pink-800 font-medium flex items-center gap-2 transition-colors duration-300 group/link"
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Read article</span>
                        <motion.span 
                          className="inline-block"
                          animate={{ 
                            x: hoveredCard === index ? [0, 4, 0] : 0
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: hoveredCard === index ? Infinity : 0
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.span>
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Hover overlay effect */}
                  <motion.div 
                    className="absolute inset-0 bg-black/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All Button - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-full font-medium hover:from-pink-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group/button"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore All Beauty Tips
                <motion.span
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></span>
              
              {/* Button shine effect */}
              <motion.span 
                className="absolute top-0 left-0 w-1/3 h-full bg-white/20 transform -skew-x-12"
                initial={{ left: '-100%' }}
                animate={{
                  left: ['-100%', '150%', '150%'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
})