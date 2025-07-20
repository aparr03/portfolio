import { useState, useEffect } from 'react';
import { useSEO } from './useSEO';

interface ScrollSpyOptions {
  offset?: number;
  threshold?: number;
}

/**
 * Hook that tracks which section is currently in view and updates SEO accordingly
 */
export const useScrollSpyWithSEO = (
  sectionIds: string[] = ['home', 'about', 'resume', 'projects', 'contact'],
  options: ScrollSpyOptions = {}
) => {
  const { offset = 100, threshold = 0.3 } = options;
  const [currentSection, setCurrentSection] = useState<string>(sectionIds[0]);

  // Update SEO when section changes
  useSEO(currentSection);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const windowHeight = window.innerHeight;

      // Find the current section based on scroll position
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + element.offsetHeight;

        // Check if section is in view
        const isInView = scrollPosition >= elementTop - windowHeight * threshold &&
                        scrollPosition < elementBottom - windowHeight * threshold;

        if (isInView) {
          setCurrentSection(sectionId);
          break;
        }
      }
    };

    // Set initial section
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, threshold]);

  return currentSection;
};

/**
 * Simple scroll spy hook without SEO updates (for when you want manual control)
 */
export const useScrollSpy = (
  sectionIds: string[] = ['home', 'about', 'resume', 'projects', 'contact'],
  options: ScrollSpyOptions = {}
) => {
  const { offset = 100, threshold = 0.3 } = options;
  const [currentSection, setCurrentSection] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const windowHeight = window.innerHeight;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + element.offsetHeight;

        const isInView = scrollPosition >= elementTop - windowHeight * threshold &&
                        scrollPosition < elementBottom - windowHeight * threshold;

        if (isInView) {
          setCurrentSection(sectionId);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, threshold]);

  return currentSection;
}; 