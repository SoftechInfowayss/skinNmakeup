import React, { memo } from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
export default memo(function Footer() {
  return (
    <div>
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Beauty Community</h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter for exclusive offers, beauty tips, and new product launches
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:max-w-xl">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-md"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-sm mt-4 opacity-70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
})
