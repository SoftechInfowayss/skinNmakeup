import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { LuChevronRight, LuSparkles } from 'react-icons/lu';

export default memo(function Aboutherosection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-black min-h-screen overflow-hidden relative">
      <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center will-change-transform"
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 1.8, 
              ease: [0.16, 0.77, 0.47, 0.97] 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.7)_100%)]"></div>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/80 rounded-full"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                y: [0, (Math.random() - 0.5) * 40],
                x: [0, (Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <motion.div 
          className="container mx-auto px-6 relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Text content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div variants={item}>
                <span className="text-gold-400 font-medium tracking-[0.3em] mb-6 block text-xs uppercase flex items-center justify-center lg:justify-start">
                  <LuSparkles className="mr-2" /> SINCE 2018 • MILAN
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.9]"
                variants={item}
              >
                <span className="block font-serif italic">Glamour</span>
                <span className="block text-gold-300 font-serif italic">Heaven</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-12 font-light tracking-wide"
                variants={item}
              >
                Where <span className="text-gold-300">divine beauty</span> meets <span className="text-pink-200">scientific perfection</span>. 
                Our couture cosmetics elevate your natural radiance to celestial heights.
              </motion.p>
              
              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button 
                  className="relative overflow-hidden bg-gradient-to-r from-gold-500 to-gold-600 text-black font-medium py-4 px-8 rounded-full group flex items-center justify-center min-w-[220px]"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="relative z-10 flex items-center">
                    Discover Luxury
                    <LuChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </motion.button>
                
                <motion.button 
                  className="relative overflow-hidden border border-white/30 text-white font-medium py-4 px-8 rounded-full group flex items-center justify-center min-w-[220px] backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.03,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.6)',
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Collection
                    <LuChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Luxury product showcase */}
            <motion.div 
              className="hidden lg:block lg:w-1/2 relative h-[500px]"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.6,
                duration: 1.2,
                ease: [0.16, 0.77, 0.47, 0.97]
              }}
            >
              {/* Floating luxury product */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-64 bg-gradient-to-b from-pink-100 to-gold-50 rounded-lg shadow-inner"></div>
                </div>
              </motion.div>
              
              {/* Reflective light effect */}
              <motion.div 
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-gold-400/20 to-transparent blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 40, 0],
                  y: [0, 30, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Luxury scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center"
          >
            <span className="text-white/70 text-xs mb-1 tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-t from-gold-500 to-transparent"></div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
});