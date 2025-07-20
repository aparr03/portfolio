import { useEffect } from 'react';
import { updateSEO, getSEOForSection, SEOData } from '../utils/seo';

interface SEOHeadProps {
  section?: string;
  customSEO?: Partial<SEOData>;
}

/**
 * SEO component that updates meta tags based on section or custom data
 */
export const SEOHead: React.FC<SEOHeadProps> = ({ section = 'home', customSEO }) => {
  useEffect(() => {
    // Get base SEO data for section
    const baseSEOData = getSEOForSection(section);
    
    // Merge with custom SEO data if provided
    const finalSEOData = customSEO 
      ? { ...baseSEOData, ...customSEO }
      : baseSEOData;
    
    // Update meta tags
    updateSEO(finalSEOData);
  }, [section, customSEO]);

  return null; // This component doesn't render anything
};

export default SEOHead; 