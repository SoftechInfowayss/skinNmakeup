import React, { memo } from 'react'
import { motion } from 'framer-motion';
import { LuAward, LuLeaf, LuHeart, LuChevronRight } from 'react-icons/lu';
import { FaFlask, FaRecycle, FaComments } from 'react-icons/fa';
export default memo(function Aboutnavbar() {
  return (
    <div>
      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden">
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
      </section>
    </div>
  )
})
