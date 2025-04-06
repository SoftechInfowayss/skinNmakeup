import React, { memo } from 'react'
import { motion } from 'framer-motion';
import { LuAward, LuLeaf, LuHeart, LuChevronRight } from 'react-icons/lu';
import { FaFlask, FaRecycle, FaComments } from 'react-icons/fa';
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
export default memo(function Aboutteammember() {
  return (
    <div>
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
    </div>
  )
})
