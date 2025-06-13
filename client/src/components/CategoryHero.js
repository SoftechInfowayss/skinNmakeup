import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

// Typewriter effect component for the heading
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
        className="inline-block w-1 h-6 bg-pink-400 ml-1"
      />
    </motion.span>
  );
};

const CatHeroSection = ({ setSelectedCategory }) => {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 300], [0, -50]); // Parallax effect

  // Featured products for marquee
  const featuredProducts = [
    { name: 'Luxury Lipstick', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Eternal Perfume', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Glow Serum', image: 'https://images.unsplash.com/photo-1625772299848-391b6a48d7da?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50">
      {/* Background Radial Gradient Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='rgba(255, 182, 193, 0.2)' fill-opacity='1' d='M0,224L60,229.3C120,235,240,245,360,224C480,203,600,149,720,149.3C840,149,960,203,1080,213.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-6">
        {/* Left Side - Text and CTA */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left p-8 rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl border border-pink-100/50"
          style={{ y: yTransform }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            <TypewriterText text="Elevate Your Beauty" delay={0.5} />
          </h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Experience luxury with our handpicked collection of beauty essentials designed for you.
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 25px rgba(236, 72, 153, 0.5), 0 0 50px rgba(236, 72, 153, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-semibold text-lg shadow-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 overflow-hidden"
            onClick={() => setSelectedCategory('all')}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-20 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6 }}
              key={Date.now()}
            />
            Explore Now
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Right Side - 3D Product Showcase */}
        <motion.div
          className="lg:w-1/2 flex justify-center mt-12 lg:mt-0"
          style={{ y: yTransform }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.div
            className="relative group w-72 h-96 rounded-2xl overflow-hidden shadow-xl"
            whileHover={{ scale: 1.05 }}
            style={{
              perspective: '1000px',
            }}
          >
            {/* Product Image with 3D Tilt Effect */}
            <motion.div
              className="w-full h-full"
              whileHover={{
                rotateX: 10,
                rotateY: 10,
                transition: { duration: 0.3 },
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                alt="Featured Product"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gray-800/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6"
              >
                <h3 className="text-white text-xl font-semibold">Luxury Lipstick</h3>
                <p className="text-gray-200 text-sm">Bold color, lasting shine</p>
                <motion.div
                  className="flex gap-1 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
            {/* Glow Effect on Hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 50px rgba(236, 72, 153, 0.4)',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee for Featured Products */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden bg-white/60 backdrop-blur-sm py-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...featuredProducts, ...featuredProducts].map((product, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 flex items-center gap-3 px-4 py-2 bg-pink-50/80 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 192, 203, 0.9)' }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-gray-800 text-sm font-medium">{product.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CatHeroSection;