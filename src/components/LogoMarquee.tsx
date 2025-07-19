import React from 'react';
import { motion } from 'framer-motion';

// Local tech icons from belt_images folder
const techLogos = [
  { name: 'JavaScript', src: '/images/belt_images/javascript.svg' },
  { name: 'TypeScript', src: '/images/belt_images/typescript.svg' },
  { name: 'React', src: '/images/belt_images/react_logo.svg' },
  { name: 'Python', src: '/images/belt_images/python.svg' },
  { name: 'Node.js', src: '/images/belt_images/nodejs.svg' },
  { name: 'Docker', src: '/images/belt_images/docker.svg' },
  { name: 'HTML5', src: '/images/belt_images/html5.svg' },
  { name: 'CSS3', src: '/images/belt_images/css3.svg' },
  { name: 'Git', src: '/images/belt_images/git.svg' },
  { name: 'GitHub', src: '/images/belt_images/github.svg' },
  { name: 'VS Code', src: '/images/belt_images/vscode.svg' },
  { name: 'MongoDB', src: '/images/belt_images/mongodb.svg' },
  { name: 'Next.js', src: '/images/belt_images/nextjs.svg' },
  { name: 'Redux', src: '/images/belt_images/redux.svg' },
  { name: 'Node.js', src: '/images/belt_images/nodejs.svg' },
  { name: 'Framer Motion', src: '/images/belt_images/framer-motion_logo.svg' },
  { name: 'Tailwind CSS', src: '/images/belt_images/tailwind_logo.svg' },
  { name: 'Vercel', src: '/images/belt_images/vercel_logo.svg' },
  { name: 'Vite', src: '/images/belt_images/vite_logo.svg' },
];

const LogoMarquee: React.FC = () => {
  // Animation speed control - adjust this value to change scroll speed
  // Lower values = faster animation, Higher values = slower animation
  const ANIMATION_SPEED = 30; // Duration in seconds for one complete cycle
  
  // Create multiple duplicates for seamless infinite scroll (1,2,3,1,2,3 pattern)
  const logoItems = [...techLogos, ...techLogos, ...techLogos];

  return (
    <div className="logo-marquee-container w-full overflow-hidden bg-gradient-to-r from-indigo-950 to-violet-950 py-6 border-b border-indigo-800/30">
      <div className="relative w-full">
        <motion.div
          className="flex space-x-12 items-center"
          style={{
            width: 'max-content',
          }}
          animate={{
            x: ["0%", "-33.33%"], // Move exactly one set (33.33% of 3 sets)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: ANIMATION_SPEED,
              ease: "linear",
            },
          }}
        >
          {logoItems.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center justify-center p-2"
            >
              <img 
                src={logo.src} 
                alt={`${logo.name} logo`} 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain filter brightness-[1.2] opacity-75 hover:opacity-100 hover:brightness-[1.5] transition-all duration-300"
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