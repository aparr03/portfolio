import { motion } from 'framer-motion';
import { useState } from 'react';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const experience = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2021 - Present',
      description: 'Led the frontend development team in building responsive web applications using React and TypeScript. Implemented state management with Redux and improved performance by 40%.',
      achievements: [
        'Architected and implemented a component library used across multiple projects',
        'Reduced bundle size by 35% through code splitting and lazy loading',
        'Mentored junior developers and conducted code reviews'
      ],
      color: 'from-indigo-500 to-violet-500'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Innovations',
      period: '2018 - 2021',
      description: 'Developed and maintained multiple client-facing web applications. Collaborated with designers and backend developers to implement new features and improve user experience.',
      achievements: [
        'Built responsive interfaces using React and modern CSS techniques',
        'Integrated RESTful APIs and implemented authentication flows',
        'Participated in agile development processes'
      ],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 3,
      title: 'Web Developer Intern',
      company: 'StartUp Labs',
      period: '2017 - 2018',
      description: 'Assisted in the development of web applications and gained hands-on experience with modern web technologies.',
      achievements: [
        'Developed and maintained company website using HTML, CSS, and JavaScript',
        'Created interactive UI components for client projects',
        'Learned version control with Git and collaborative development'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Master of Science in Computer Science',
      institution: 'University of Technology',
      period: '2016 - 2018',
      description: 'Specialized in Web Technologies and Software Engineering. Graduated with honors.',
      courses: ['Advanced Web Development', 'Software Architecture', 'Database Systems', 'UI/UX Design'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 2,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      period: '2012 - 2016',
      description: 'Focused on programming fundamentals and software development. Participated in coding competitions.',
      courses: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Web Development Basics', 'Computer Networks'],
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2022',
      credentialId: 'AWS-DEV-12345',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 2,
      name: 'Professional Frontend Developer',
      issuer: 'Frontend Masters',
      date: '2021',
      credentialId: 'FM-PFD-67890',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'React Advanced Concepts',
      issuer: 'React Training',
      date: '2020',
      credentialId: 'RT-RAC-54321',
      color: 'from-teal-500 to-emerald-500'
    }
  ];

  return (
    <section id="resume" className="resume-bg section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-float"></div>
      <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float animate-delay-300"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-violet-400 rounded-full animate-float animate-delay-600"></div>

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text">My Resume</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            My professional journey and qualifications that have shaped my career in web development.
          </p>
        </motion.div>

        {/* Resume Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-md" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg transition-all duration-300 ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Education
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg transition-all duration-300 ${
                activeTab === 'certifications'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Certifications
            </button>
          </div>
        </div>

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {experience.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="timeline-item"
              >
                <div className={`timeline-dot bg-gradient-to-br ${job.color}`}></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4 border border-indigo-50 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className={`text-sm font-medium text-white bg-gradient-to-r ${job.color} px-3 py-1 rounded-full shadow-sm mt-2 md:mt-0`}>
                      {job.period}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-indigo-600 mb-4">{job.company}</h4>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Key Achievements:</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-700">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="timeline-item"
              >
                <div className={`timeline-dot bg-gradient-to-br ${edu.color}`}></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4 border border-indigo-50 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <span className={`text-sm font-medium text-white bg-gradient-to-r ${edu.color} px-3 py-1 rounded-full shadow-sm mt-2 md:mt-0`}>
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-indigo-600 mb-4">{edu.institution}</h4>
                  <p className="text-gray-700 mb-4">{edu.description}</p>
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Relevant Courses:</h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full border border-indigo-100">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md border border-indigo-50 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${cert.color}`}></div>
                <div className="pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-700 mb-4">Issued by {cert.issuer}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-indigo-600 font-medium">Issued: {cert.date}</span>
                    <span className="text-xs text-gray-500">ID: {cert.credentialId}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Download Resume Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="/your-resume.pdf"
            download
            className="btn btn-primary inline-flex items-center px-8 py-4 rounded-full shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume; 