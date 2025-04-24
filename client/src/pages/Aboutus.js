import React from 'react';
import { motion } from 'framer-motion';
import { LuAward, LuLeaf, LuHeart, LuChevronRight } from 'react-icons/lu';
import { FaFlask, FaRecycle, FaComments } from 'react-icons/fa';
import Herosection from '../components/Aboutcomponents/Herosection';
import Footer from '../components/Footer';
const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'With 15 years in cosmetic chemistry, Sarah brings innovation to our formulations.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      social: ['linkedin', 'twitter', 'instagram']
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head Chemist',
      bio: 'Specializing in organic compounds, Michael ensures our products are both effective and safe.',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      social: ['linkedin', 'researchgate']
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Creative Director',
      bio: 'Elena brings artistry to our brand with her background in visual design and makeup artistry.',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
      social: ['behance', 'instagram', 'pinterest']
    }
  ];

  // Product showcase data
  const featuredProducts = [
    {
      id: 1,
      name: 'Hydra Glow Serum',
      type: 'Skincare',
      img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      awards: ['Allure Best of Beauty 2023', 'Vogue Beauty Award']
    },
    {
      id: 2,
      name: 'Luxe Matte Lipstick',
      type: 'Makeup',
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      awards: ['InStyle Best Lipstick', 'Cosmopolitan Beauty Award']
    },
    {
      id: 3,
      name: 'Revitalizing Night Cream',
      type: 'Skincare',
      img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      awards: ['Dermatologist Recommended', 'Elle Eco Beauty Award']
    }
  ];

  // Stats data
  const stats = [
    { value: '10M+', label: 'Products Sold Worldwide' },
    { value: '50+', label: 'Countries Served' },
    { value: '100%', label: 'Cruelty-Free' },
    { value: '85%', label: 'Sustainable Packaging' }
  ];

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Hero Section - Parallax Effect */}
      <Herosection />
      {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      </section> */}

      {/* Brand Introduction */}
      <section className="relative py-28 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-400 filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-400 filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Beauty Standards</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              At Lumiére Beauty, we merge cutting-edge cosmetic science with sustainable practices to create products that 
              enhance your natural beauty while respecting our planet. Our formulations are the result of years of research 
              and a deep understanding of skin biology.
            </p>
          </motion.div>
          
          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-4xl font-bold text-pink-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Philosophy */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                  alt="Beauty lab" 
                  className="w-full h-auto transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/0"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Our Research Lab</h3>
                  <p className="text-white/80">Where innovation comes to life</p>
                </div>
              </div>
              
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-pink-100 rounded-full opacity-40"></div>
              <div className="absolute -z-10 -top-6 -left-6 w-40 h-40 bg-purple-100 rounded-full opacity-30"></div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Philosophy</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe beauty should be inclusive, sustainable, and backed by science. Our products are designed to 
                work with your skin's natural biology, not against it. Every formula undergoes rigorous testing to ensure 
                efficacy, safety, and environmental responsibility.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <LuAward className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Clinically Proven</h4>
                    <p className="text-gray-600">All formulations tested by dermatologists</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <LuLeaf className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Eco-Conscious</h4>
                    <p className="text-gray-600">Sustainable sourcing and packaging</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <LuHeart className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Cruelty-Free</h4>
                    <p className="text-gray-600">Never tested on animals</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-pink-200 filter blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-purple-200 filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-pink-600 font-medium tracking-widest mb-4 block">THE TEAM</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Visionaries</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A diverse team of scientists, artists, and innovators dedicated to redefining beauty.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 h-96">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                  
                  {/* Social links animation */}
                  <motion.div 
                    className="absolute bottom-6 left-6 flex gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {member.social.map((platform, i) => (
                      <motion.a 
                        key={i}
                        href="#"
                        className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition"
                        whileHover={{ y: -5 }}
                      >
                        <span className="sr-only">{platform}</span>
                        {/* Icon would go here */}
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
                
                <div className="px-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-pink-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  
                  <motion.a 
                    href="#"
                    className="inline-flex items-center text-pink-600 font-medium group"
                    whileHover={{ x: 5 }}
                  >
                    View profile <LuChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-pink-600 font-medium tracking-widest mb-4 block">OUR FORMULATIONS</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Signature Creations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Award-winning products that have redefined beauty standards.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500"
              >
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-white text-pink-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Bestseller
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                    <span className="text-pink-600 text-sm font-medium">{product.type}</span>
                    
                    <div className="mt-4">
                      {product.awards.map((award, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <svg className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 text-sm">{award}</span>
                        </div>
                      ))}
                    </div>
                    
                    <motion.button 
                      className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Discover
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-pink-400 font-medium tracking-widest mb-4 block">OUR COMMITMENT</span>
            <h2 className="text-4xl font-bold mb-6">Core Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide every decision we make at Lumiére Beauty.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-pink-400/30 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600/40 transition-colors duration-500">
                <FaFlask className="text-pink-400 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Scientific Integrity</h3>
              <p className="text-gray-300 mb-6">
                We base our formulations on peer-reviewed research and rigorous clinical testing to ensure efficacy and safety.
              </p>
              <motion.a 
                href="#"
                className="inline-flex items-center text-pink-400 font-medium group"
                whileHover={{ x: 5 }}
              >
                Our research <LuChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-pink-400/30 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600/40 transition-colors duration-500">
                <FaRecycle className="text-pink-400 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Environmental Stewardship</h3>
              <p className="text-gray-300 mb-6">
                From sustainable sourcing to biodegradable packaging, we minimize our ecological footprint at every step.
              </p>
              <motion.a 
                href="#"
                className="inline-flex items-center text-pink-400 font-medium group"
                whileHover={{ x: 5 }}
              >
                Our sustainability <LuChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-pink-400/30 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600/40 transition-colors duration-500">
                <FaComments className="text-pink-400 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community Engagement</h3>
              <p className="text-gray-300 mb-6">
                We listen, learn, and grow with our community, creating products that address real needs and concerns.
              </p>
              <motion.a 
                href="#"
                className="inline-flex items-center text-pink-400 font-medium group"
                whileHover={{ x: 5 }}
              >
                Join the conversation <LuChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80')] bg-cover bg-center bg-fixed opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/90 to-purple-600/90"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Begin Your <span className="text-pink-200">Lumiére Journey</span> Today
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join our community of beauty enthusiasts who trust our science-backed, sustainable products.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button 
                className="relative overflow-hidden bg-white text-pink-600 font-semibold py-4 px-8 rounded-full group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Collection <LuChevronRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              
              <motion.button 
                className="relative overflow-hidden border-2 border-white text-white font-semibold py-4 px-8 rounded-full group"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Consultation <LuChevronRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default AboutUs;