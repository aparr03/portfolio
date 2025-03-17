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
      color: 'from-indigo-500 to-violet-500'
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
      color: 'from-blue-500 to-indigo-500'
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
      degree: 'Bachelor of Science in Computer Science',
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
      courses: ['Placeholder', 'Placeholder', 'Placeholder'],
      color: 'from-violet-500 to-purple-500'      
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'AZ-900: Azure Fundamentals',
      issuer: 'Microsoft Learn',
      date: '2022',
      credentialId: '',
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
            href="/documents/Parr_Resume_Portfolio.pdf"
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