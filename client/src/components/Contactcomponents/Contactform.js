import React, { memo } from 'react'
const ContactUs = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 2000);
    };
  
    const toggleFaq = (index) => {
      setActiveFaq(activeFaq === index ? null : index);
    };
export default memo(function Contactform() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
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
              
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 overflow-hidden"
                  >
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Thank you! Your message has been sent successfully.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
    </div>
  )
})
