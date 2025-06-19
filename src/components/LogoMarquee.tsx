import React from 'react';
import { motion } from 'framer-motion';

// Logos for programming languages and tools
const techLogos = [
  { name: 'JavaScript', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'HTML5', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Python', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C#', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Git', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'VS Code', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Azure', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'MySQL', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Redux', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
];

// Duplicate logos for seamless loop
const logoItems = [...techLogos, ...techLogos];

const LogoMarquee: React.FC = () => {
  return (
    <div className="logo-marquee-container w-full overflow-hidden bg-gradient-to-r from-indigo-950 to-violet-950 py-6 border-b border-indigo-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="flex space-x-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
          style={{ willChange: 'transform' }}
        >
          {logoItems.map((logo, index) => (
            <div key={index} className="flex flex-col items-center justify-center flex-shrink-0">
              <img 
                src={logo.svg} 
                alt={`${logo.name} logo`} 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain filter brightness-[1.2] opacity-75 hover:opacity-100 hover:brightness-[1.5] transition-all duration-300"
                title={logo.name}
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoMarquee; 