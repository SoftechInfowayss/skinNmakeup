import React, { memo } from 'react'
import { motion } from 'framer-motion';
import { LuAward, LuLeaf, LuHeart, LuChevronRight } from 'react-icons/lu';
import { FaFlask, FaRecycle, FaComments } from 'react-icons/fa';
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
export default memo(function Aboutproducts() {
  return (
    <div>
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
    </div>
  )
})
