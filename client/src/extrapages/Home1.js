import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Play, ArrowRight, Sparkles, Star, Heart, Shield, Droplets, Leaf, Gem, CircleDollarSign, Truck,Activity,FileText } from 'lucide-react';

const Home = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const floatAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  const products = [
    {
      id: 1,
      name: "Bio-Renewal Serum",
      category: "Anti-Aging",
      price: "$98",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1586&q=80",
      badge: "BESTSELLER"
    },
    {
      id: 2,
      name: "Hydra-Fill Moisturizer",
      category: "Hydration",
      price: "$72",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
      badge: "NEW"
    },
    {
      id: 3,
      name: "Luminous CC Cream",
      category: "Makeup",
      price: "$65",
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      badge: "LIMITED"
    },
    {
      id: 4,
      name: "Clarifying Toner",
      category: "Acne Treatment",
      price: "$58",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
      badge: null
    }
  ];

  const ingredients = [
    {
      name: "Hyaluronic Acid",
      benefit: "Deep Hydration",
      icon: <Droplets className="text-blue-500" />
    },
    {
      name: "Niacinamide",
      benefit: "Brightening",
      icon: <Sparkles className="text-yellow-500" />
    },
    {
      name: "Peptides",
      benefit: "Collagen Boost",
      icon: <Gem className="text-purple-500" />
    },
    {
      name: "Plant Stem Cells",
      benefit: "Renewal",
      icon: <Leaf className="text-green-500" />
    }
  ];

  const testimonials = [
    {
      quote: "My skin has never looked better. After just 2 weeks, my fine lines were visibly reduced.",
      author: "Sarah J., 42",
      rating: 5
    },
    {
      quote: "The only products that don't irritate my sensitive skin while actually delivering results.",
      author: "Michael T., 35",
      rating: 5
    },
    {
      quote: "Worth every penny. I've tried everything and this is the first that made a real difference.",
      author: "Priya K., 50",
      rating: 5
    }
  ];

  const benefits = [
    {
      title: "Dermatologist Tested",
      description: "All products rigorously tested by board-certified dermatologists",
      icon: <Shield className="text-pink-600" />
    },
    {
      title: "Cruelty Free",
      description: "Never tested on animals, Leaping Bunny certified",
      icon: <Heart className="text-rose-500" />
    },
    {
      title: "Clinical Results",
      description: "Proven efficacy in independent clinical trials",
      icon: <Star className="text-amber-500" />
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
  ref={ref}
  className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center"
>
  {/* Advanced particle system */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(40)].map((_, i) => {
      const size = Math.random() * 4 + 1;
      const duration = 8 + Math.random() * 15;
      const delay = Math.random() * 10;
      const distance = 100 + Math.random() * 300;
      
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.08, 0],
            scale: [0, size/10, 0],
            x: [0, Math.random() * distance - distance/2],
            y: [0, Math.random() * distance - distance/2],
            rotate: [0, Math.random() * 360]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: delay,
            ease: "anticipate"
          }}
          className="absolute rounded-full mix-blend-multiply"
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(${
              Math.random() > 0.5 ? '244,114,182' : '251,113,133'
            },0.15) 0%, transparent 70%)`
          }}
        />
      );
    })}
  </div>

  {/* Dynamic gradient mesh background */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <radialGradient id="gradient1" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(244, 114, 182, 0.1)" />
          <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
        </radialGradient>
        <radialGradient id="gradient2" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(251, 113, 133, 0.1)" />
          <stop offset="100%" stopColor="rgba(251, 113, 133, 0)" />
        </radialGradient>
      </defs>
      <motion.rect 
        width="100" height="100" 
        fill="url(#gradient1)"
        initial={{ x: "-30%", y: "-30%" }}
        animate={{
          x: ["-30%", "-25%", "-30%"],
          y: ["-30%", "-35%", "-30%"]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.rect 
        width="100" height="100" 
        fill="url(#gradient2)"
        initial={{ x: "70%", y: "60%" }}
        animate={{
          x: ["70%", "75%", "70%"],
          y: ["60%", "65%", "60%"]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 5
        }}
      />
    </svg>
  </div>

  {/* Subtle grid overlay */}
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="h-full w-full bg-[size:40px_40px] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]"></div>
  </div>

  <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="text-center lg:text-left"
      >
        <motion.div variants={item} className="mb-8">
          <motion.span 
            className="inline-flex items-center bg-white text-pink-600 px-4 py-2 rounded-full text-sm font-medium tracking-wide shadow-sm border border-gray-100"
            whileHover={{
              y: -2,
              boxShadow: "0 5px 15px -5px rgba(236, 72, 153, 0.3)"
            }}
          >
            <Sparkles size={16} className="mr-2" />
            <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              New Scientific Collection
            </span>
          </motion.span>
        </motion.div>
        
        <motion.h1 
          variants={item}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
        >
          <span className="inline-block relative">
            <span className="relative z-10 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Clinical Beauty
            </span>
            <motion.span 
              className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-pink-200 to-rose-200 w-full rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          <br />
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Redefined by Science
          </span>
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="text-xl text-gray-600 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed"
        >
          Experience dermatologist-developed skincare and precision cosmetics powered by 10 years of clinical research and patented bio-active compounds.
        </motion.p>
        
        <motion.div 
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <motion.button
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 30px -5px rgba(236, 72, 153, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden group bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              maskImage: 'linear-gradient(75deg, transparent, white 50%, transparent)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}></span>
            <span className="relative z-10 flex items-center gap-2">
              Discover Formulations
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:scale-110" />
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.03,
              backgroundColor: "#f9fafb"
            }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden group bg-white text-gray-900 font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 border border-gray-200 hover:border-gray-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Play size={16} className="text-pink-600 relative z-10" />
            <span className="relative z-10">Research Video</span>
          </motion.button>
        </motion.div>
        
        <motion.div 
          variants={item}
          className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8"
        >
          {[
            { number: "98.7%", text: "Clinical Efficacy", icon: <Activity size={20} className="text-pink-600" /> },
            { number: "0", text: "Harmful Ingredients", icon: <Shield size={20} className="text-pink-600" /> },
            { number: "24", text: "Patented Technologies", icon: <FileText size={20} className="text-pink-600" /> }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center lg:text-left group"
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-2">
                {stat.icon}
                <p className="text-3xl font-bold text-gray-900 flex items-center">
                  {stat.number}
                  {index === 0 && (
                    <motion.span 
                      className="ml-2 text-xs font-normal bg-green-100 text-green-800 px-2 py-1 rounded-full"
                      whileHover={{ rotate: [0, 10, -10, 0] }}
                    >
                      Proven
                    </motion.span>
                  )}
                </p>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mt-1 group-hover:text-gray-700 transition-colors">
                {stat.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Product showcase - 3D floating effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <div className="relative max-w-md mx-auto">
          {/* Main product image with parallax effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10"
            whileHover="hover"
            variants={{
              hover: {
                y: -10,
                transition: { duration: 0.4 }
              }
            }}
          >
            <motion.div
              variants={{
                hover: {
                  rotateY: 5,
                  rotateX: -2,
                  transition: { duration: 0.6 }
                }
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Clinical skincare products" 
                className="w-full h-auto rounded-2xl shadow-2xl border-8 border-white/90 bg-white"
              />
            </motion.div>
          </motion.div>
          
          {/* Floating product 1 - Serum with advanced hover */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 40 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0, 
              y: 0,
              transition: { delay: 0.8 }
            } : {}}
            whileHover={{ 
              y: -15,
              zIndex: 20,
              scale: 1.1,
              boxShadow: "0 15px 30px -10px rgba(0,0,0,0.2)"
            }}
            className="absolute -left-12 -top-12 z-20 w-24 h-24 bg-white rounded-xl shadow-xl p-3 border border-gray-100 hover:border-pink-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80" 
              alt="Serum" 
              className="w-full h-full object-contain rounded-md"
            />
            <motion.div 
              className="absolute -bottom-2 -right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full shadow-sm"
              whileHover={{ scale: 1.1 }}
            >
              NEW
            </motion.div>
          </motion.div>
          
          {/* Floating product 2 - Moisturizer with advanced hover */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0, 
              y: 0,
              transition: { delay: 1.0 }
            } : {}}
            whileHover={{ 
              y: -15,
              zIndex: 20,
              scale: 1.1,
              boxShadow: "0 15px 30px -10px rgba(0,0,0,0.2)"
            }}
            className="absolute -right-12 -bottom-12 z-20 w-28 h-28 bg-white rounded-xl shadow-xl p-3 border border-gray-100 hover:border-pink-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
              alt="Moisturizer" 
              className="w-full h-full object-contain rounded-md"
            />
            <motion.div 
              className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full shadow-sm"
              whileHover={{ scale: 1.1 }}
            >
              BEST
            </motion.div>
          </motion.div>
          
          {/* Animated floating circles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? {
              opacity: 1,
              transition: { delay: 1.2 }
            } : {}}
            className="absolute -z-10"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-pink-200/50"
                style={{
                  width: `${100 + i * 100}px`,
                  height: `${100 + i * 100}px`,
                  left: '50%',
                  top: '50%',
                  translateX: '-50%',
                  translateY: '-50%'
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: i % 2 === 0 ? [0, 5] : [0, -5]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</section>
      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Vogue", logo: "VOGUE" },
              { name: "Allure", logo: "ALLURE" },
              { name: "Elle", logo: "ELLE" },
              { name: "Cosmopolitan", logo: "COSMO" }
            ].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">{brand.logo}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{brand.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Clinical Formulations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Scientifically proven to deliver visible results without compromise
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${hoveredProduct === product.id ? 'scale-105' : 'scale-100'}`}
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white text-pink-600 font-medium py-2 rounded-lg"
                    >
                      Quick Add
                    </motion.button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-gray-900">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px -5px rgba(236, 72, 153, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-200 text-gray-900 font-medium py-3 px-8 rounded-lg hover:border-pink-300 hover:text-pink-600 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              View All Products
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-lg">
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="Science lab" 
                  className="w-full h-auto rounded-xl shadow-xl border-8 border-white/90"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-4xl font-bold text-pink-600 mb-2">10+</div>
                  <div className="text-sm text-gray-600">Years of research</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Backed by Science, Proven by Results</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our formulations are developed in collaboration with dermatologists and scientists, using only ingredients with clinically proven efficacy at optimal concentrations.
              </p>
              
              <div className="space-y-6">
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-pink-50 p-3 rounded-full">
                      {ingredient.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{ingredient.name}</h3>
                      <p className="text-gray-600">{ingredient.benefit}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Clean, Conscious, Effective
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              We believe beauty should be both high-performance and responsible
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-pink-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Real Results, Real People
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Join thousands of customers who've transformed their skin
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <p className="font-medium text-gray-900">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Transform Your Skin?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto"
            >
              Experience the difference of clinically-proven skincare today
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-pink-600 font-medium py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Shop Now
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border-2 border-white text-white font-medium py-4 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Take Skin Quiz
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ingredients</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Skincare</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Makeup</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
              <p className="mb-4">Sign up for exclusive offers and skincare tips</p>
              <div className="flex mb-6">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                />
                <button className="bg-pink-600 text-white px-4 py-2 rounded-r-lg hover:bg-pink-700 transition-colors">
                  Join
                </button>
              </div>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="sr-only">Instagram</span>
                  {/* Icon would go here */}
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="sr-only">Facebook</span>
                  {/* Icon would go here */}
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="sr-only">Twitter</span>
                  {/* Icon would go here */}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 Clinical Beauty. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;