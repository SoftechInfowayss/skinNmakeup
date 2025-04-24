import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Instagram, Facebook, Twitter, ChevronDown, Loader2 } from 'lucide-react';
import Footer from '../components/Footer'
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null); // New state for error messages
  const [activeFaq, setActiveFaq] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Enhanced animations with pink theme
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 30px -10px rgba(236, 72, 153, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // New modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        // Auto-close the modal after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitError(error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
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

      {/* Contact Content */}
      <section id="contact-form" className="py-20 relative z-10" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Enhanced Contact Form with Pink Accents */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-3xl shadow-xl p-10 border border-pink-100/50 backdrop-blur-sm bg-white/90 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-pink-100/20 blur-xl"></div>
              <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-rose-100/20 blur-xl"></div>
              
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
                  Let's Start a Conversation
                </span>
              </motion.h2>
              
              <form onSubmit={handleSubmit}>
                <motion.div 
                  variants={fadeInUp}
                  className="mb-6 relative"
                >
                  <label htmlFor="name" className="block text-gray-700 mb-2 text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-gray-400"
                    placeholder="Your name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none top-7">
                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  transition={{ delay: 0.1 }}
                  className="mb-6 relative"
                >
                  <label htmlFor="email" className="block text-gray-700 mb-2 text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none top-7">
                    <Mail className="w-5 h-5 text-pink-400" />
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  transition={{ delay: 0.2 }}
                  className="mb-6 relative"
                >
                  <label htmlFor="subject" className="block text-gray-700 mb-2 text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-gray-400"
                    placeholder="What's this about?"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none top-7">
                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  transition={{ delay: 0.3 }}
                  className="mb-8 relative"
                >
                  <label htmlFor="message" className="block text-gray-700 mb-2 text-sm font-medium">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-gray-400"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </motion.div>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {submitError}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={fadeInUp}
                  transition={{ delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center relative overflow-hidden"
                >
                  {/* Button shine effect */}
                  <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{
                    transform: 'translateX(-100%) rotate(15deg)',
                    filter: 'blur(10px)'
                  }}></span>
                  
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Premium Contact Info with Enhanced Pink Theme */}
            <motion.div 
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
                    How Can We Help?
                  </span>
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you need product recommendations, skincare advice, or have questions about our formulations, our beauty consultants are here to provide personalized assistance.
                </p>
              </motion.div>

              {[
                {
                  icon: <Mail size={20} className="text-pink-600" />,
                  title: "Email Us",
                  details: ["hello@glamourhaven.com", "support@glamourhaven.com"],
                  bg: "bg-gradient-to-br from-pink-50 to-pink-100/20 border border-pink-100/50"
                },
                {
                  icon: <Phone size={20} className="text-pink-600" />,
                  title: "Call Us",
                  details: ["+1 (555) 123-4567", "Mon-Fri: 9am-6pm EST"],
                  bg: "bg-gradient-to-br from-rose-50 to-rose-100/20 border border-rose-100/50"
                },
                {
                  icon: <MapPin size={20} className="text-pink-600" />,
                  title: "Visit Us",
                  details: ["123 Beauty Avenue", "New York, NY 10001"],
                  bg: "bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/20 border border-fuchsia-100/50"
                },
                {
                  icon: <Clock size={20} className="text-pink-600" />,
                  title: "Business Hours",
                  details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm", "Sunday: Closed"],
                  bg: "bg-gradient-to-br from-rose-50 to-pink-100/20 border border-pink-100/50"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover="hover"
                  className={`p-6 rounded-2xl backdrop-blur-sm ${item.bg} shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:to-rose-500/5 transition-all duration-300"></div>
                  
                  <div className="flex items-start space-x-4 relative z-10">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-pink-100">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social Media with Enhanced Pink Hover Effects */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
                className="pt-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Follow Our Beauty Journey</h3>
                <div className="flex space-x-3">
                  {[
                    { icon: <Instagram size={20} />, color: "bg-gradient-to-br from-pink-600 to-rose-500", hover: "hover:from-pink-700 hover:to-rose-600" },
                    { icon: <Facebook size={20} />, color: "bg-gradient-to-br from-pink-600 to-pink-400", hover: "hover:from-pink-700 hover:to-pink-500" },
                    { icon: <Twitter size={20} />, color: "bg-gradient-to-br from-rose-500 to-pink-400", hover: "hover:from-rose-600 hover:to-pink-500" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${social.color} ${social.hover} shadow-md transition-all duration-300 relative overflow-hidden group`}
                      whileHover={{ 
                        y: -4,
                        scale: 1.1,
                        boxShadow: "0 8px 20px -5px rgba(236, 72, 153, 0.3)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {/* Social icon shine effect */}
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                        transform: 'translateX(-100%) rotate(15deg)',
                        filter: 'blur(6px)'
                      }}></span>
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section with Pink Overlay */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-hidden rounded-3xl shadow-2xl border border-pink-100/30 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-rose-500/10 z-10 pointer-events-none"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018456!2d-73.9878449242396!3d40.74844097138972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1689872881013!5m2!1sen!2sus" 
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="transition duration-500 hover:opacity-90 relative z-0"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/30 via-transparent to-transparent z-10" />
          </motion.div>
        </div>
      </section>

      {/* Animated FAQ Section with Pink Accents */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
                Common Questions
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to frequent inquiries about our products and services.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {[
              {
                question: "What's your return policy?",
                answer: "We offer a 30-day money-back guarantee on all unopened products. For opened products, we provide store credit or exchange within 14 days of purchase."
              },
              {
                question: "Are your products cruelty-free and vegan?",
                answer: "Yes! We're proud to be Leaping Bunny certified and 100% vegan. We never test on animals and all our ingredients are plant-derived or synthetic alternatives."
              },
              {
                question: "Do you offer international shipping?",
                answer: "We ship to over 80 countries worldwide. Shipping costs and delivery times vary by destination. During checkout, you'll see exact shipping options for your location."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email. You can also check your order status anytime by logging into your account on our website."
              },
              {
                question: "What ingredients do you avoid in your formulations?",
                answer: "Our 'No List' includes parabens, sulfates, phthalates, mineral oil, synthetic fragrances, formaldehyde, and over 1,500 other questionable ingredients commonly found in beauty products."
              },
              {
                question: "Can I get personalized skincare recommendations?",
                answer: "Absolutely! Our Beauty Concierge service offers free virtual consultations with our skincare experts. Book a session through our website or mobile app."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="overflow-hidden"
              >
                <motion.div 
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFaq === index 
                      ? 'bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100' 
                      : 'bg-white border border-pink-50 hover:bg-pink-50/30'
                  }`}
                  onClick={() => toggleFaq(index)}
                  whileHover={{ 
                    y: -2,
                    boxShadow: "0 10px 20px -10px rgba(236, 72, 153, 0.2)"
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-pink-600" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3D CTA Section with Enhanced Pink Gradient */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-500 opacity-95 z-0"></div>
        
        {/* Floating beauty product bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
              y: [0, Math.random() * 200 - 100],
              x: [0, Math.random() * 200 - 100]
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
            className="absolute rounded-full border-2 border-white/20 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 10 + 5}rem`,
              height: `${Math.random() * 10 + 5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Beauty Routine?</h2>
            <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
              Join our community of beauty enthusiasts and discover your perfect skincare and makeup matches.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 30px -10px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-pink-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Button shine effect */}
                <span className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  transform: 'translateX(-100%) rotate(15deg)',
                  filter: 'blur(8px)'
                }}></span>
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 30px -10px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Button shine effect */}
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  transform: 'translateX(-100%) rotate(15deg)',
                  filter: 'blur(8px)'
                }}></span>
                Book a Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-pink-100/50 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Decorative background elements */}
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-pink-100/20 blur-xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-rose-100/20 blur-xl"></div>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                  className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-600 to-rose-500 text-white"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
                    Message Sent!
                  </span>
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
                <motion.button
                  onClick={() => setSubmitSuccess(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;