import { motion } from 'framer-motion';

const Home = () => {
  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-70">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/40 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="section-container relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-32 h-32 rounded-full border-4 border-white/30 mx-auto mb-8 overflow-hidden shadow-xl"
          >
            <img
              src="/your-photo.jpg" // Add your photo here
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-white">
            Hi, I'm{' '}
            <motion.span
              className="text-yellow-300 inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              [Your Name]
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto"
          >
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.a
              href="#projects"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold hover:from-yellow-300 hover:to-yellow-400 transform hover:-translate-y-1 transition duration-300 shadow-lg hover:shadow-xl w-48 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transform hover:-translate-y-1 transition duration-300 shadow-lg hover:shadow-xl w-48 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      <div className="absolute top-20 left-10 w-20 h-20 border-4 border-blue-300/20 rounded-full"></div>
      <div className="absolute top-40 right-20 w-10 h-10 border-4 border-purple-300/20 rounded-full"></div>
      <div className="absolute bottom-40 left-1/4 w-15 h-15 border-4 border-indigo-300/20 rounded-full"></div>
    </section>
  );
};

export default Home; 