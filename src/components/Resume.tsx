import { motion } from 'framer-motion';
import { useState } from 'react';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const experience = [
    {
      id: 1,
      title: 'Systems Analyst',
      company: 'Central Michigan University',
      period: 'Nov 2022 - Present',
      achievements: [
        'Provided technical support for Microsoft 365, Blackboard, DUO MFA, and SAP for students and faculty',
        'Resolved authentication, database access, and system configuration issues via phone, chat, and email',
        'Developed strong problem-solving skills, handling over 4000 tickets with a roughly 83% closed-on-first-contact rate',
        'Gained experience troubleshooting software and writing technical documentation for internal use'
      ],
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Towbook',
      period: 'May 2021 - July 2022',
      achievements: [
        'Automated the process to create impound PDF letters resulting in a 3x increase in claims processed',
        'Utilized Asana to track, assign, and manage tickets within the system',
        'Worked in customer support and data entry, creating accounts for customers, and importing info'
      ],
      color: 'from-violet-500 to-blue-500'
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Bachelors of Science in Computer Science',
      institution: 'Central Michigan University',
      period: '2022 - 2025',
      description: 'Completed my Bachelors of Computer Science and a minor in Information Technology',
      courses: ['Advanced Web Development', 'Software Architecture', 'Database Systems', 'UI/UX Design'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 2,
      degree: 'Partial College Towards Bachelors of Science',
      institution: 'St. Clair County Community College',
      period: '2018 - 2022',
      description: 'Completed 54 credits accumulating a GPA of 3.08',
      courses: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Web Development Basics', 'Computer Networks'],
      color: 'from-blue-500 to-violet-500'
    },
    {
      id: 3,
      degree: 'High School Diploma',
      institution: 'St. Clair High School',
      period: '2017 - 2021',
      description: 'Graduated Summa Cum Laude with a GPA of 3.78',
      courses: [],
      color: 'from-violet-500 to-purple-500'      
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'AZ-900: Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2022',
      credentialId: 'DE7FC6480533A3F9',
      color: 'from-amber-500 to-orange-500',
      credlyUrl: 'https://www.credly.com/badges/e6f0302f-4a6d-41cf-98fe-870ec9416843/public_url'
    },
    {
      id: 2,
      name: 'SC-900: Microsoft Security, Compliance, and Identity Fundamentals',
      issuer: 'Microsoft',
      date: '2023',
      credentialId: '801EC8FD78D3937B',
      color: 'from-blue-500 to-cyan-500',
      credlyUrl: 'https://www.credly.com/badges/158b07be-9ae5-4736-851b-82b65fe32dcf/public_url'
    }
  ];

  return (
    <section id="resume" className="resume-bg section-padding relative overflow-hidden dark:bg-gray-900">
      {/* Simple plain background */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 z-0"></div>

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text dark:text-gray-100">My Resume</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
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
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
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
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
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
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
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
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ml-4 border border-indigo-50 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h3>
                    <span className={`text-sm font-medium text-white bg-gradient-to-r ${job.color} px-3 py-1 rounded-full shadow-sm mt-2 md:mt-0`}>
                      {job.period}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">{job.company}</h4>
                  <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2">Key Achievements:</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-400">{achievement}</li>
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
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ml-4 border border-indigo-50 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                    <span className={`text-sm font-medium text-white bg-gradient-to-r ${edu.color} px-3 py-1 rounded-full shadow-sm mt-2 md:mt-0`}>
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">{edu.institution}</h4>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">{edu.description}</p>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-indigo-50 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden flex flex-col h-full"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${cert.color}`}></div>
                <div className="pl-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{cert.name}</h3>
                  <a 
                    href={cert.credlyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                    </svg>
                    Verify on Credly
                  </a>
                </div>
                <div className="pl-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-400">Issued by {cert.issuer} in {cert.date}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">ID: {cert.credentialId}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Replace Download Resume Button with message */}
        <motion.div
          className="text-center mt-16 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.p
            className="text-lg font-medium text-gray-700 dark:text-gray-300 p-4 border border-indigo-100 dark:border-gray-700 rounded-lg inline-block bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)",
              transition: { duration: 0.1 }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Resume available upon request
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume; 