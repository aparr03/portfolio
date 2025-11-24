import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showTools, setShowTools] = useState(false);
  
  // Add CSS for enhanced images 
  // This would normally go in a CSS file, but we'll add it inline for simplicity
  const imageEnhancedStyle = `
    .image-enhanced {
      image-rendering: -webkit-optimize-contrast;
      backface-visibility: hidden;
      transform: translateZ(0);
      perspective: 1000px;
    }
  `;
  
  const portfolioTools = [
    { name: 'React', icon: '/images/react_logo.svg', color: '#61DAFB', description: 'Frontend library' },
    { name: 'Vite', icon: '/images/vite_logo.svg', color: '#646CFF', description: 'Build tool' },
    { name: 'Tailwind CSS', icon: '/images/tailwind_logo.svg', color: '#38B2AC', description: 'Styling framework' },
    { name: 'Framer Motion', icon: '/images/framer-motion_logo.svg', color: '#0055FF', description: 'Animation library' },
    { name: 'Vercel', icon: '/images/vercel_logo.svg', color: '#000000', description: 'Deployment platform' },
    { name: 'Node.js', icon: '/images/belt_images/nodejs.svg', color: '#339933', description: 'Server runtime' }
  ];
  
  const projects = [
    {
      id: 1,
      title: 'Tymelyne',
      description: 'A mobile app using openAI to generate tailored learning paths for users.',
      image: '/images/demo_images/tymelyne_demo.png',
      tags: ['MongoDB', 'OpenAI API', 'Docker', 'ExpoGo'],
      category: 'fullstack',
      demoLink: 'https://aparr03.github.io/tymelyne_demo/',
      codeLink: 'https://github.com/marcdejesus/tymelyne',
      color: 'from-indigo-500 to-blue-500',
      noTint: true
    },
    {
      id: 2,
      title: 'The CompLex',
      description: 'Main website for a local sports complex that used to be a warehouse. Features registration, reservations, and a payment system.',
      image: '/images/demo_images/complex_demo.png',
      tags: ['React', 'Scheduler', 'Vercel'],
      category: 'frontend',
      demoLink: 'https://the-complex.vercel.app/',
      codeLink: 'https://github.com/aparr03/the-complex',
      color: 'from-transparent to-transparent',
      noTint: true,
      imageEnhanced: true
    },
    {
      id: 3,
      title: 'Parr-4-The-Course',
      description: 'A recipe website that allows users to sign in, create new recipes, and save them to their profile or share them with a community.',
      image: '/images/demo_images/p4tc_demo.png',
              tags: ['React', 'Vite', 'Node.js', 'Vercel'],
      category: 'fullstack',
      demoLink: 'https://p4tc.vercel.app/',
      codeLink: 'https://github.com/aparr03/parr-4-the-course',
      color: 'from-violet-500 to-purple-500',
      noTint: true
    },
    {
      id: 4,
      title: 'Well-Tasked',
      description: 'My first take at a task management app. This app allows for users to create an account and upload a bio with a profile picture.',
      image: '/images/demo_images/welltasked_demo.png',
      tags: ['React', 'API', 'Chart.js'],
      category: 'frontend',
      demoLink: 'https://welltasked.vercel.app/',
      codeLink: 'https://github.com/aparr03/WellTasked',
      color: 'from-transparent to-transparent',
      noTint: true,
      imageEnhanced: true
    }    
  ];

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Frontend', value: 'frontend' },
    { name: 'Backend', value: 'backend' },
    { name: 'Full Stack', value: 'fullstack' },
  ];

  // Get categories that have at least one project
  const getAvailableFilters = () => {
    const availableCategories = new Set(projects.map(project => project.category));
    
    return filters.filter(filter => 
      filter.value === 'all' || availableCategories.has(filter.value)
    );
  };

  const availableFilters = getAvailableFilters();

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects-bg section-padding relative overflow-hidden dark:bg-gray-900">
      {/* Add style tag for enhanced images */}
      <style dangerouslySetInnerHTML={{ __html: imageEnhancedStyle }} />
      
      {/* Enhanced background styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/20 dark:to-purple-950/20 z-0 bg-animate-slow"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-100/30 to-transparent dark:from-indigo-900/10 dark:to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-100/30 to-transparent dark:from-purple-900/10 dark:to-transparent z-0"></div>

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text dark:text-gray-100">My Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects. Each one was carefully crafted to solve specific problems and showcase different skills.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {availableFilters.map((filter, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500'
                  : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3}}
            >
              {filter.name}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card h-full flex flex-col glow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.1 }
              }}
            >
              <div className="relative overflow-hidden h-60">
                {!project.noTint && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}></div>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 
                    ${!project.noTint ? 'mix-blend-overlay' : ''} 
                    ${project.imageEnhanced ? 'image-enhanced' : ''}`}
                  style={project.imageEnhanced ? {
                    imageRendering: 'auto',
                    filter: 'contrast(1.05) brightness(1.05)',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                  } : {}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 5).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 5 && (
                      <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        +{project.tags.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col bg-white dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
                <div className="flex justify-between mt-auto">
                  <motion.a
                    href={project.demoLink}
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center"
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
                    className="text-gray-700 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center"
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
          <div className="flex flex-col items-center space-y-4">
            <motion.button
              onClick={() => setShowTools(!showTools)}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 inline-flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {showTools ? 'Hide Tools Used' : 'Tools For This Portfolio'}
            </motion.button>
            
            <AnimatePresence>
              {showTools && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-4xl mx-auto mb-8"
                >
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-100 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-center mb-6 gradient-text">Tools Used For This Portfolio</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {portfolioTools.map((tool, index) => (
                        <motion.div
                          key={tool.name}
                          className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="w-12 h-12 mb-3 flex items-center justify-center">
                            <img
                              src={tool.icon}
                              alt={`${tool.name} icon`}
                              className="w-8 h-8 object-contain"
                              style={{ opacity: 1 }}
                              onError={(e) => {
                                const target = e.currentTarget;
                                const letter = tool.name.charAt(0);
                                const parent = target.parentNode;
                                if (parent) {
                                  const div = document.createElement('div');
                                  div.className = 'w-10 h-10 flex items-center justify-center text-xl font-bold rounded-md';
                                  div.style.backgroundColor = `${tool.color}15`;
                                  div.style.color = tool.color;
                                  div.textContent = letter;
                                  parent.replaceChild(div, target);
                                }
                              }}
                            />
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{tool.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{tool.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.a
              href="https://github.com/aparr03"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.032 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View More on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 