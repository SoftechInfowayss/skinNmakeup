import React, { memo } from 'react'
import { motion } from 'framer-motion';
import { LuAward, LuLeaf, LuHeart, LuChevronRight } from 'react-icons/lu';
import { FaFlask, FaRecycle, FaComments } from 'react-icons/fa';
export default memo(function Aboutherosection() {
  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Hero Section - Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1587&q=80')] bg-cover bg-center bg-fixed opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30"></div>
        
        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <span className="text-pink-400 font-medium tracking-widest mb-4 block">SINCE 2015</span>
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
              initial={{ letterSpacing: '0.5em' }}
              animate={{ letterSpacing: '0.05em' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              LUMIÈRE
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Where scientific innovation meets timeless beauty
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button 
              className="relative overflow-hidden bg-white text-pink-600 font-semibold py-4 px-8 rounded-full group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Discover Our Story</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
            
            <motion.button 
              className="relative overflow-hidden border-2 border-white text-white font-semibold py-4 px-8 rounded-full group"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Products <LuChevronRight className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>
    </div>
  )
})
