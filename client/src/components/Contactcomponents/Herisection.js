import React, { memo } from 'react'

export default memo(function Herisection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
        {/* Floating Rose Petals Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20, rotate: Math.random() * 360 }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [0, Math.random() * 300 - 150],
              x: [0, Math.random() * 200 - 100],
              rotate: Math.random() * 720
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 10
            }}
            className="absolute text-pink-300/30"
            style={{
              fontSize: `${Math.random() * 2 + 1}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            ✿
          </motion.div>
        ))}
      </div>
       {/* Hero Section with Enhanced Pink Gradient */}
       <section className="relative py-32 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1586&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-rose-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
                Connect With Glamour Haven
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Our beauty experts are ready to assist you with product recommendations, skincare advice, and any questions you may have.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a 
                href="#contact-form" 
                className="bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Send size={20} />
                Send a Message
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
})
