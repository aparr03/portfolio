import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Vercel', 
    'HTML/CSS', 'Tailwind CSS', 'SQL', 'Git',
    'Next.js', 'REST APIs'
  ];

  return (
    <section id="about" className="about-bg section-padding relative overflow-hidden dark:bg-gray-900">
      {/* Enhanced background styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/20 dark:to-violet-950/20 z-0 bg-animate-slow"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-100/30 to-transparent dark:from-indigo-900/10 dark:to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-violet-100/30 to-transparent dark:from-violet-900/10 dark:to-transparent z-0"></div>
      
      {/* Content container */}
      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text dark:text-gray-100">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-xl transform rotate-3"></div>
              <div className="absolute -inset-4 bg-white/50 dark:bg-gray-800/50 rounded-xl transform -rotate-2"></div>
              <img 
                src="/images/portraits/andrew_grad.png" 
                alt="Professional headshot" 
                className="relative z-10 rounded-lg shadow-xl w-full h-auto border-4 border-white dark:border-gray-700"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl transform rotate-12 opacity-80"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full transform opacity-80"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Hello, I'm <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">Andrew Parr</span></h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with a strong focus on building clean, efficient, and user-friendly applications. With a Bachelor's degree in Computer Science and a Minor in IT, I have 3+ years of experience working in development, combining my technical expertise with creative problem-solving.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            My journey in software development has been shaped by hands-on experience in web development, app development, systems analysis, and database management. I have a keen interest in modern front-end frameworks, cloud technologies, and optimizing application performance. Whether it's crafting responsive user interfaces, managing scalable backends, or integrating databases like MongoDB Atlas, I thrive on turning complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm actively seeking opportunities in web development and software engineering, where I can apply my expertise while continuing to expand my knowledge. If you're looking for a dedicated and versatile developer, let's connect!
            </p>

            <div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">My <span className="text-indigo-600 dark:text-indigo-400">Skills</span></h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="skill-badge transition-colors duration-200 hover:bg-indigo-600 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-indigo-600 dark:hover:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.a
              href="#contact"
              className="btn btn-primary inline-block mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 