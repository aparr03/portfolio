import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 
    'HTML/CSS', 'Tailwind CSS', 'MongoDB', 'SQL', 'Git',
    'Next.js', 'Redux', 'REST APIs', 'GraphQL', 'AWS'
  ];

  return (
    <section id="about" className="about-bg section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-float"></div>
      <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float animate-delay-300"></div>
      <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-violet-400 rounded-full animate-float animate-delay-600"></div>

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text">About Me</span>
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
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl transform rotate-3"></div>
              <div className="absolute -inset-4 bg-white/50 rounded-xl transform -rotate-2"></div>
              <img 
                src="/about-image.jpg" 
                alt="Professional headshot" 
                className="relative z-10 rounded-lg shadow-xl w-full h-auto border-4 border-white"
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
            <h3 className="text-2xl font-semibold text-gray-800">Hello, I'm <span className="text-indigo-600">[Your Name]</span></h3>
            <p className="text-gray-700 leading-relaxed">
              I'm a passionate full-stack developer with a strong focus on creating clean, efficient, and user-friendly applications. 
              With [X] years of experience in web development, I enjoy turning complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My approach to development combines technical expertise with creative problem-solving. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices.
            </p>
            <p className="text-gray-700 leading-relaxed">
              When I'm not coding, you can find me [your hobbies/interests]. I'm always open to new opportunities and challenges that allow me to grow as a developer.
            </p>

            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">My <span className="text-indigo-600">Skills</span></h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="skill-badge"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, backgroundColor: '#4F46E5', color: 'white' }}
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