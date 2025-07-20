// SEO utility for managing meta tags dynamically
export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonicalUrl?: string;
}

// Default SEO configuration
export const defaultSEO: SEOData = {
  title: "Andrew Parr - Full Stack Developer Portfolio",
  description: "Andrew Parr is a full-stack developer specializing in React, Node.js, JavaScript, and modern web technologies. View my projects, skills, and get in touch.",
  keywords: "Andrew Parr, Full Stack Developer, React Developer, Node.js, TypeScript, JavaScript, Web Developer, Portfolio, Frontend, Backend, Software Engineer",
  ogTitle: "Andrew Parr - Full Stack Developer",
  ogDescription: "Full-stack developer portfolio showcasing modern web applications built with React, Node.js, and JavaScript.",
  ogImage: "/images/portfolio_logo.svg",
  canonicalUrl: "https://aparr.dev"
};

// SEO data for each section
export const sectionSEO: Record<string, SEOData> = {
  home: {
    title: "Andrew Parr - Full Stack Developer Portfolio",
    description: "Welcome to Andrew Parr's portfolio. Full-stack developer creating modern web applications with React, Node.js, JavaScript, and cutting-edge technologies.",
    keywords: "Andrew Parr, Full Stack Developer, React, Node.js, TypeScript, Web Developer, Portfolio",
    ogTitle: "Andrew Parr - Full Stack Developer",
    ogDescription: "Full-stack developer creating modern web applications",
    canonicalUrl: "https://aparr.dev/#home"
  },
  about: {
    title: "About Andrew Parr - Full Stack Developer",
    description: "Learn about Andrew Parr's background, experience, and passion for full-stack development. Discover my journey in web development and technology.",
    keywords: "Andrew Parr, About, Background, Full Stack Developer, Experience, Skills, Web Development",
    ogTitle: "About Andrew Parr",
    ogDescription: "Full-stack developer with expertise in modern web technologies",
    canonicalUrl: "https://aparr.dev/#about"
  },
  resume: {
    title: "Andrew Parr's Resume - Full Stack Developer Experience",
    description: "View Andrew Parr's work experience, education, and technical skills in full-stack development.",
    keywords: "Andrew Parr, Resume, CV, Experience, Education, Skills, Full Stack Developer, Employment",
    ogTitle: "Andrew Parr - Resume",
    ogDescription: "Professional experience and skills in full-stack development",
    canonicalUrl: "https://aparr.dev/#resume"
  },
  projects: {
    title: "Andrew Parr's Projects - Full Stack Development Portfolio",
    description: "Explore Andrew Parr's portfolio of full-stack development projects featuring React, Node.js, JavaScript, and modern web technologies.",
    keywords: "Andrew Parr, Projects, Portfolio, React Projects, Node.js, TypeScript, Web Applications, Full Stack Projects",
    ogTitle: "Andrew Parr - Projects",
    ogDescription: "Full-stack development projects and web applications",
    canonicalUrl: "https://aparr.dev/#projects"
  },
  contact: {
    title: "Contact Andrew Parr - Full Stack Developer",
    description: "Get in touch with Andrew Parr for full-stack development opportunities, collaborations, or project discussions.",
    keywords: "Andrew Parr, Contact, Full Stack Developer, Hire, Collaboration, Web Development Services",
    ogTitle: "Contact Andrew Parr",
    ogDescription: "Get in touch for development opportunities and collaborations",
    canonicalUrl: "https://aparr.dev/#contact"
  }
};

// Function to update document meta tags
export const updateSEO = (seoData: SEOData) => {
  // Update title
  document.title = seoData.title;
  
  // Update or create meta tags
  updateMetaTag('description', seoData.description);
  updateMetaTag('keywords', seoData.keywords);
  
  // Open Graph tags
  updateMetaTag('og:title', seoData.ogTitle || seoData.title, 'property');
  updateMetaTag('og:description', seoData.ogDescription || seoData.description, 'property');
  updateMetaTag('og:type', 'website', 'property');
  updateMetaTag('og:url', seoData.canonicalUrl || window.location.href, 'property');
  
  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, 'property');
    updateMetaTag('og:image:alt', seoData.ogTitle || seoData.title, 'property');
  }
  
  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', seoData.twitterTitle || seoData.ogTitle || seoData.title);
  updateMetaTag('twitter:description', seoData.twitterDescription || seoData.ogDescription || seoData.description);
  
  // Canonical URL
  if (seoData.canonicalUrl) {
    updateCanonicalLink(seoData.canonicalUrl);
  }
};

// Helper function to update or create meta tags
const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

// Helper function to update canonical link
const updateCanonicalLink = (url: string) => {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  canonical.setAttribute('href', url);
};

// Function to get SEO data for a specific section
export const getSEOForSection = (section: string): SEOData => {
  return sectionSEO[section] || defaultSEO;
};

// JSON-LD structured data for the portfolio
export const generateStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Andrew Parr",
    "jobTitle": "Full Stack Developer",
    "description": "Full-stack developer specializing in React, Node.js, JavaScript, and modern web technologies",
    "url": "https://aparr.dev",
    "image": "https://aparr.dev/images/portraits/headshot.jpg",
    "sameAs": [
      "https://github.com/aparr03",
      "https://www.linkedin.com/in/andrew-parr-53b144215/"
    ],
    "knowsAbout": [
      "React",
      "Node.js", 
      "TypeScript",
      "JavaScript",
      "Full Stack Development",
      "Web Development",
      "Frontend Development",
      "Backend Development"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Central Michigan University 25'"
    }
  };

  return JSON.stringify(structuredData);
};

// Function to inject structured data into the page
export const injectStructuredData = () => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = generateStructuredData();
  document.head.appendChild(script);
}; 