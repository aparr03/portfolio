import { useEffect } from 'react';
import { updateSEO, getSEOForSection, injectStructuredData } from '../utils/seo';

/**
 * Custom hook to manage SEO updates based on the current section
 */
export const useSEO = (section: string) => {
  useEffect(() => {
    // Get SEO data for the current section
    const seoData = getSEOForSection(section);
    
    // Update meta tags
    updateSEO(seoData);
    
    // Inject structured data (only once for the main page)
    if (section === 'home') {
      injectStructuredData();
    }
  }, [section]);
};

/**
 * Hook to set up initial SEO on app load
 */
export const useInitialSEO = () => {
  useEffect(() => {
    // Set initial SEO for home page
    const seoData = getSEOForSection('home');
    updateSEO(seoData);
    injectStructuredData();
  }, []);
}; 