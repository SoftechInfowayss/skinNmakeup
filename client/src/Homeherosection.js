import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import makeup from "./image/makeup.jpg"
import skincare from "./image/skincare.jpg"
import hair from "./image/hair1.jpg"
import perfume from "./image/perfume1.jpg"
const BeautyHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const constraintsRef = useRef(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  const heroSlides = [
    {
      title: "Glow That Lasts All Day",
      subtitle: "Discover our long-wear foundation collection",
      cta: "Shop Now",
      bgColor: "from-pink-50 to-pink-100",
      textColor: "text-gray-800",
      accentColor: "from-pink-500 to-pink-700",
      image: makeup,
      animationColor: "bg-pink-500",
      badge: "New Arrival",
      particles: 150,
      particleColor: "bg-pink-300",
      shapes: ["circle", "blob", "triangle"],
      gradient: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)"
    },
    {
      title: "Luxurious Skincare Rituals",
      subtitle: "Premium ingredients for radiant skin",
      cta: "Explore Skincare",
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-gray-800",
      accentColor: "from-purple-500 to-purple-700",
      image: skincare,
      animationColor: "bg-purple-500",
      badge: "Best Seller",
      particles: 120,
      particleColor: "bg-purple-300",
      shapes: ["blob", "square", "wave"],
      gradient: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)"
    },
    {
      title: "Professional Hair Solutions",
      subtitle: "Transform your hair with salon-quality care",
      cta: "View Haircare",
      bgColor: "from-fuchsia-50 to-fuchsia-100",
      textColor: "text-gray-800",
      accentColor: "from-fuchsia-500 to-fuchsia-700",
      image: hair,
      animationColor: "bg-fuchsia-500",
      badge: "Trending Now",
      particles: 180,
      particleColor: "bg-fuchsia-300",
      shapes: ["triangle", "circle", "zigzag"],
      gradient: "linear-gradient(135deg, #f8bbd0 0%, #e91e63 100%)"
    },
    {
      title: "Elegant Fragrances",
      subtitle: "Captivating scents for every personality",
      cta: "Discover Scents",
      bgColor: "from-violet-50 to-violet-100",
      textColor: "text-gray-800",
      accentColor: "from-violet-500 to-violet-700",
      image: perfume,
      animationColor: "bg-violet-500",
      badge: "Limited Edition",
      particles: 200,
      particleColor: "bg-violet-300",
      shapes: ["wave", "blob", "square"],
      gradient: "linear-gradient(135deg, #d1c4e9 0%, #7e57c2 100%)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const animation = animate(count, 100, {
      duration: 7,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    });

    return () => animation.stop();
  }, [currentSlide]);

  // Dynamic shape components
  const Shape = ({ type, size, color, style }) => {
    const getShapePath = () => {
      switch(type) {
        case 'blob':
          return (
            <path d="M30.5,25.5 C33.5,20.5 39.5,15.5 46.5,20.5 C53.5,25.5 56.5,35.5 50.5,40.5 C44.5,45.5 33.5,45.5 27.5,40.5 C21.5,35.5 27.5,30.5 30.5,25.5 Z" 
                  fill={color} />
          );
        case 'triangle':
          return (
            <path d="M25,10 L50,50 L0,50 Z" fill={color} />
          );
        case 'square':
          return (
            <rect x="10" y="10" width="40" height="40" fill={color} />
          );
        case 'wave':
          return (
            <path d="M0,25 C15,10 35,40 50,25 C65,10 85,40 100,25" 
                  stroke={color} strokeWidth="4" fill="none" />
          );
        case 'zigzag':
          return (
            <path d="M0,25 L25,50 L50,25 L75,50 L100,25" 
                  stroke={color} strokeWidth="4" fill="none" />
          );
        default: // circle
          return (
            <circle cx="25" cy="25" r="20" fill={color} />
          );
      }
    };

    return (
      <motion.svg 
        width={size} 
        height={size} 
        viewBox="0 0 50 50"
        style={style}
      >
        {getShapePath()}
      </motion.svg>
    );
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Premium Hero Section */}
      <section className="relative h-screen min-h-[800px] overflow-hidden" ref={constraintsRef}>
        {/* Animated Background Gradient */}
        <motion.div 
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgColor} transition-all duration-1000`}
          style={{
            backgroundImage: heroSlides[currentSlide].gradient
          }}
        />
        
        {/* Fluid Simulation Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic Fluid Blobs */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={`fluid-${i}-${currentSlide}`}
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: 0.8
              }}
              animate={{
                x: [null, Math.random() * 100, Math.random() * 100],
                y: [null, Math.random() * 100, Math.random() * 100],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className={`absolute ${heroSlides[currentSlide].animationColor} opacity-20 rounded-full filter blur-3xl`}
              style={{
                width: `${300 + i * 150}px`,
                height: `${300 + i * 150}px`
              }}
            />
          ))}

          {/* Floating Shapes */}
          {heroSlides[currentSlide].shapes.map((shape, i) => (
            <motion.div
              key={`shape-${i}-${currentSlide}`}
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                rotate: Math.random() * 360
              }}
              animate={{
                x: [null, Math.random() * 100, Math.random() * 100],
                y: [null, Math.random() * 100, Math.random() * 100],
                rotate: [null, Math.random() * 360, Math.random() * 360]
              }}
              transition={{
                duration: 30 + i * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute opacity-10"
            >
              <Shape 
                type={shape} 
                size={200 + i * 50} 
                color={heroSlides[currentSlide].animationColor.replace('bg-', '#').replace('500', '300')}
              />
            </motion.div>
          ))}

          {/* Particle System */}
          {[...Array(heroSlides[currentSlide].particles)].map((_, i) => {
            const size = 3 + Math.random() * 7;
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 10;
            
            return (
              <motion.div
                key={`particle-${i}-${currentSlide}`}
                initial={{ 
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0
                }}
                animate={{ 
                  x: [null, Math.random() * 100, Math.random() * 100],
                  y: [null, Math.random() * 100, Math.random() * 100],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatDelay: delay,
                  ease: "easeInOut"
                }}
                className={`absolute rounded-full ${heroSlides[currentSlide].particleColor} shadow-sm`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  filter: 'blur(0.5px)'
                }}
              />
            );
          })}
        </div>

        {/* Interactive Floating Elements */}
        <motion.div
          drag
          dragConstraints={constraintsRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute ${heroSlides[currentSlide].animationColor} w-40 h-40 rounded-full filter blur-xl opacity-30 top-1/4 left-1/4`}
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          drag
          dragConstraints={constraintsRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute ${heroSlides[currentSlide].animationColor.replace('500', '300')} w-60 h-60 rounded-full filter blur-xl opacity-20 bottom-1/4 right-1/4`}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Geometric Grid Overlay */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 h-full container mx-auto px-6 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Text Content - Left Side */}
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <motion.span 
                  className={`text-sm font-semibold ${heroSlides[currentSlide].textColor.replace('800', '600')} bg-white/80 px-4 py-2 rounded-full shadow-sm inline-block`}
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  Premium Collection
                </motion.span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${heroSlides[currentSlide].textColor} leading-tight tracking-tight`}
              >
                {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                  <motion.span
                    key={`word-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`text-2xl md:text-3xl mb-10 ${heroSlides[currentSlide].textColor.replace('800', '600')} font-light max-w-lg`}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 flex-wrap"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 20px 40px -10px ${heroSlides[currentSlide].animationColor.replace('bg-', '')}/40`
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative bg-gradient-to-r ${heroSlides[currentSlide].accentColor} text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group`}
                >
                  <span className="relative z-10">{heroSlides[currentSlide].cta}</span>
                  <motion.span
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  />
                  {/* Animated button shine */}
                  <motion.div
                    className="absolute top-0 left-0 w-20 h-full bg-white/30"
                    initial={{ x: '-100%' }}
                    animate={{ 
                      x: ['-100%', '150%', '150%'],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }
                    }}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 text-gray-800 border border-gray-200 px-8 py-5 rounded-full font-medium text-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Premium Image Frame - Right Side */}
            <motion.div 
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[520px]">
                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className={`absolute -top-10 -left-10 w-40 h-40 ${heroSlides[currentSlide].animationColor.replace('500', '300')}/20 rounded-full filter blur-xl`}
                />
                <motion.div
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5
                  }}
                  className={`absolute -bottom-12 -right-12 w-48 h-48 ${heroSlides[currentSlide].animationColor.replace('500', '200')}/20 rounded-full filter blur-xl`}
                />
                
                {/* Main Image Container */}
                <div className="relative w-full h-full">
                  {/* Animated Floating Elements */}
                  <motion.div
                    animate={{
                      y: [0, -30, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute -top-8 -left-8 w-32 h-32 ${heroSlides[currentSlide].animationColor.replace('500', '400')}/30 rounded-full filter blur-lg`}
                  />
                  
                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    className={`absolute -bottom-6 -right-6 w-24 h-24 ${heroSlides[currentSlide].animationColor.replace('500', '400')}/30 rounded-full filter blur-lg`}
                  />
                  
                  {/* Decorative Frame */}
                  <motion.div 
                    animate={{ rotate: [0, 2, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -inset-6 bg-gradient-to-br ${heroSlides[currentSlide].accentColor} rounded-3xl opacity-20 shadow-2xl`}
                  />
                  <motion.div 
                    animate={{ rotate: [0, -1, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className={`absolute -inset-3 bg-gradient-to-br ${heroSlides[currentSlide].animationColor} rounded-3xl opacity-30 shadow-xl`}
                  />
                  
                  {/* Image with Glass Morphism Effect */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-8 border-white/90 backdrop-blur-sm bg-white/20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                    <motion.img 
                      src={heroSlides[currentSlide].image} 
                      alt="" 
                      className="w-full h-full object-cover object-center"
                      initial={{ scale: 1.1, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Premium Badge */}
                  <motion.div 
                    animate={{ 
                      y: [0, -15, 0],
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute -bottom-6 -right-6 ${heroSlides[currentSlide].animationColor.replace('500', '600')} text-white px-10 py-4 rounded-full shadow-2xl font-bold text-lg backdrop-blur-md`}
                  >
                    {heroSlides[currentSlide].badge}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Premium Slide Indicators */}
        <div className="absolute bottom-10 left-0 right-0 z-20">
          <div className="flex justify-center gap-3">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
                animate={{ 
                  width: currentSlide === index ? '3rem' : '1rem',
                  backgroundColor: currentSlide === index ? 
                    heroSlides[currentSlide].animationColor.replace('500', '600') : 
                    'rgba(255, 255, 255, 0.8)',
                  opacity: currentSlide === index ? 1 : 0.7
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="h-1.5 rounded-full cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Floating Sparkles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}-${currentSlide}`}
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              rotate: 360,
              opacity: [0, 0.8, 0],
              x: [null, Math.random() * 100, Math.random() * 100],
              y: [null, Math.random() * 100, Math.random() * 100]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute pointer-events-none"
            style={{
              width: '10px',
              height: '10px',
              background: 'radial-gradient(circle, white 20%, transparent 70%)',
              filter: 'blur(0.5px)'
            }}
          />
        ))}

        {/* Floating Micro Interactions */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-white/20 pointer-events-none"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-white/20 pointer-events-none"
          animate={{
            scale: [1, 2, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>
    </div>
  );
};

export default BeautyHomepage;