import React, { memo } from 'react'
import { motion } from 'framer-motion';
import { LuAward, LuLeaf, LuHeart, LuChevronRight } from 'react-icons/lu';
import { FaFlask, FaRecycle, FaComments } from 'react-icons/fa';
export default memo(function Aboutvalue() {
  return (
    <div>
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
    </div>
  )
})
