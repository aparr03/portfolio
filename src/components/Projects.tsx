import { motion } from 'framer-motion';
import { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
      image: '/project1.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'fullstack',
      demoLink: '#',
      codeLink: '#',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A productivity app for managing tasks, projects, and deadlines with team collaboration features.',
      image: '/project2.jpg',
      tags: ['React', 'Redux', 'Firebase'],
      category: 'frontend',
      demoLink: '#',
      codeLink: '#',
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application that provides real-time forecasts and historical weather data visualization.',
      image: '/project3.jpg',
      tags: ['JavaScript', 'API', 'Chart.js'],
      category: 'frontend',
      demoLink: '#',
      codeLink: '#',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      title: 'RESTful API Service',
      description: 'A robust API service for data management with authentication, rate limiting, and comprehensive documentation.',
      image: '/project4.jpg',
      tags: ['Node.js', 'Express', 'MongoDB'],
      category: 'backend',
      demoLink: '#',
      codeLink: '#',
      color: 'from-emerald-500 to-green-500'
    },
  ];

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Frontend', value: 'frontend' },
    { name: 'Backend', value: 'backend' },
    { name: 'Full Stack', value: 'fullstack' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects-bg section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-100/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-purple-100/50 to-transparent"></div>
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text">My Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Here are some of my recent projects. Each one was carefully crafted to solve specific problems and showcase different skills.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {filter.name}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card h-full flex flex-col glow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden h-60">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col bg-white">
                <p className="text-gray-700 mb-4 flex-grow">{project.description}</p>
                <div className="flex justify-between mt-auto">
                  <motion.a
                    href={project.demoLink}
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center"
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href={project.codeLink}
                    className="text-gray-700 font-medium hover:text-gray-900 transition-colors flex items-center"
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Code
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View more button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="https://github.com/aparr03"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 