import React, { memo } from 'react'

import { motion } from 'framer-motion';
import { LuAward, LuLeaf, LuHeart, LuChevronRight } from 'react-icons/lu';
import { FaFlask, FaRecycle, FaComments } from 'react-icons/fa';

 // Stats data
 const stats = [
    { value: '10M+', label: 'Products Sold Worldwide' },
    { value: '50+', label: 'Countries Served' },
    { value: '100%', label: 'Cruelty-Free' },
    { value: '85%', label: 'Sustainable Packaging' }
  ];

export default memo(function Aboutbrandintro() {
  return (
    <div className="bg-white min-h-screen overflow-hidden">
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
    </div>
  )
})
