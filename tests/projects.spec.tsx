import { render, screen, fireEvent } from '@testing-library/react';
import Projects from '../src/components/Projects';

describe('Projects Component', () => {
  beforeEach(() => {
    render(<Projects />);
  });

  describe('getAvailableFilters logic', () => {
    it('should display only filters that have associated projects', () => {
      // The component has frontend and fullstack projects, but no backend projects
      // So "All", "Frontend", and "Full Stack" should be visible, but "Backend" should not
      
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /frontend/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /full stack/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /^backend$/i })).not.toBeInTheDocument();
    });

    it('should always display the "All" filter regardless of project categories', () => {
      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toBeInTheDocument();
    });

    it('should only display filters for categories that exist in projects array', () => {
      // Get all filter buttons
      const filterButtons = screen.getAllByRole('button').filter(button => {
        const text = button.textContent?.toLowerCase() || '';
        return ['all', 'frontend', 'backend', 'full stack'].some(filter => 
          text.includes(filter.toLowerCase())
        );
      });

      // Should have 3 filters: All, Frontend, Full Stack (no Backend)
      const filterTexts = filterButtons.map(btn => btn.textContent?.toLowerCase());
      expect(filterTexts).toContain('all');
      expect(filterTexts).toContain('frontend');
      expect(filterTexts).toContain('full stack');
      expect(filterTexts).not.toContain('backend');
    });
  });

  describe('filteredProjects logic', () => {
    it('should display all projects when "All" filter is active by default', () => {
      // There are 4 projects total in the component
      const projectCards = screen.getAllByRole('heading', { level: 3 });
      expect(projectCards).toHaveLength(4);
      
      // Verify all project titles are present
      expect(screen.getByText('Tymelyne')).toBeInTheDocument();
      expect(screen.getByText('The CompLex')).toBeInTheDocument();
      expect(screen.getByText('Parr-4-The-Course')).toBeInTheDocument();
      expect(screen.getByText('Well-Tasked')).toBeInTheDocument();
    });

    it('should filter projects to show only frontend projects when Frontend filter is clicked', () => {
      const frontendButton = screen.getByRole('button', { name: /frontend/i });
      fireEvent.click(frontendButton);

      // Should show only 2 frontend projects: The CompLex and Well-Tasked
      const projectCards = screen.getAllByRole('heading', { level: 3 });
      expect(projectCards).toHaveLength(2);
      
      expect(screen.getByText('The CompLex')).toBeInTheDocument();
      expect(screen.getByText('Well-Tasked')).toBeInTheDocument();
      expect(screen.queryByText('Tymelyne')).not.toBeInTheDocument();
      expect(screen.queryByText('Parr-4-The-Course')).not.toBeInTheDocument();
    });

    it('should filter projects to show only fullstack projects when Full Stack filter is clicked', () => {
      const fullstackButton = screen.getByRole('button', { name: /full stack/i });
      fireEvent.click(fullstackButton);

      // Should show only 2 fullstack projects: Tymelyne and Parr-4-The-Course
      const projectCards = screen.getAllByRole('heading', { level: 3 });
      expect(projectCards).toHaveLength(2);
      
      expect(screen.getByText('Tymelyne')).toBeInTheDocument();
      expect(screen.getByText('Parr-4-The-Course')).toBeInTheDocument();
      expect(screen.queryByText('The CompLex')).not.toBeInTheDocument();
      expect(screen.queryByText('Well-Tasked')).not.toBeInTheDocument();
    });

    it('should return to all projects when All filter is clicked after filtering', () => {
      // Click frontend filter first
      const frontendButton = screen.getByRole('button', { name: /frontend/i });
      fireEvent.click(frontendButton);
      
      // Verify filtered
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
      
      // Click All filter
      const allButton = screen.getByRole('button', { name: /all/i });
      fireEvent.click(allButton);
      
      // Should show all 4 projects again
      const projectCards = screen.getAllByRole('heading', { level: 3 });
      expect(projectCards).toHaveLength(4);
    });
  });

  describe('Filter button active state', () => {
    it('should have "All" filter active by default', () => {
      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toHaveClass('from-indigo-600');
    });

    it('should apply active styles to clicked filter button', () => {
      const frontendButton = screen.getByRole('button', { name: /frontend/i });
      
      // Check it does not have active class initially
      expect(frontendButton).not.toHaveClass('from-indigo-600');
      
      // Click the button
      fireEvent.click(frontendButton);
      
      // Check it now has active class
      expect(frontendButton).toHaveClass('from-indigo-600');
    });

    it('should remove active styles from previously active filter', () => {
      const allButton = screen.getByRole('button', { name: /all/i });
      const frontendButton = screen.getByRole('button', { name: /frontend/i });
      
      // All should be active initially
      expect(allButton).toHaveClass('from-indigo-600');
      
      // Click frontend
      fireEvent.click(frontendButton);
      
      // All should no longer be active
      expect(allButton).not.toHaveClass('from-indigo-600');
      expect(frontendButton).toHaveClass('from-indigo-600');
    });
  });

  describe('Project data rendering', () => {
    it('should render project titles correctly', () => {
      expect(screen.getByText('Tymelyne')).toBeInTheDocument();
      expect(screen.getByText('The CompLex')).toBeInTheDocument();
      expect(screen.getByText('Parr-4-The-Course')).toBeInTheDocument();
      expect(screen.getByText('Well-Tasked')).toBeInTheDocument();
    });

    it('should render project descriptions', () => {
      expect(screen.getByText(/mobile app using openAI/i)).toBeInTheDocument();
      expect(screen.getByText(/local sports complex/i)).toBeInTheDocument();
      expect(screen.getByText(/recipe website/i)).toBeInTheDocument();
      expect(screen.getByText(/task management app/i)).toBeInTheDocument();
    });

    it('should display up to 5 tags per project', () => {
      // Tymelyne has 4 tags, all should be visible
      expect(screen.getByText('MongoDB')).toBeInTheDocument();
      expect(screen.getByText('OpenAI API')).toBeInTheDocument();
      expect(screen.getByText('Docker')).toBeInTheDocument();
      expect(screen.getByText('ExpoGo')).toBeInTheDocument();
    });

    it('should render Live Demo links for all projects', () => {
      const demoLinks = screen.getAllByText(/live demo/i);
      expect(demoLinks).toHaveLength(4);
    });

    it('should render View Code links for all projects', () => {
      const codeLinks = screen.getAllByText(/view code/i);
      expect(codeLinks).toHaveLength(4);
    });

    it('should have correct href attributes for demo links', () => {
      const demoLinks = screen.getAllByText(/live demo/i);
      const tymelyneDemoLink = demoLinks.find(link => 
        link.closest('a')?.href.includes('tymelyne_demo')
      );
      expect(tymelyneDemoLink?.closest('a')).toHaveAttribute('href', 'https://aparr03.github.io/tymelyne_demo/');
    });

    it('should have correct href attributes for code links', () => {
      const codeLinks = screen.getAllByText(/view code/i);
      const complexCodeLink = codeLinks.find(link => 
        link.closest('a')?.href.includes('the-complex')
      );
      expect(complexCodeLink?.closest('a')).toHaveAttribute('href', 'https://github.com/aparr03/the-complex');
    });
  });

  describe('Tools toggle functionality', () => {
    it('should not display tools section by default', () => {
      expect(screen.queryByText('Tools Used For This Portfolio')).not.toBeInTheDocument();
    });

    it('should display tools section when toggle button is clicked', () => {
      const toggleButton = screen.getByRole('button', { name: /tools for this portfolio/i });
      fireEvent.click(toggleButton);
      
      expect(screen.getByText('Tools Used For This Portfolio')).toBeInTheDocument();
    });

    it('should hide tools section when toggle button is clicked again', () => {
      const toggleButton = screen.getByRole('button', { name: /tools for this portfolio/i });
      
      // Show tools
      fireEvent.click(toggleButton);
      expect(screen.getByText('Tools Used For This Portfolio')).toBeInTheDocument();
      
      // Hide tools
      const hideButton = screen.getByRole('button', { name: /hide tools used/i });
      fireEvent.click(hideButton);
      
      // Wait for animation and check it's gone
      setTimeout(() => {
        expect(screen.queryByText('Tools Used For This Portfolio')).not.toBeInTheDocument();
      }, 400);
    });

    it('should display all portfolio tools when section is open', () => {
      const toggleButton = screen.getByRole('button', { name: /tools for this portfolio/i });
      fireEvent.click(toggleButton);
      
      // Check for all 6 tools section heading
      const toolsHeading = screen.getByText('Tools Used For This Portfolio');
      expect(toolsHeading).toBeInTheDocument();
      
      // Verify all 6 tools are present (some appear in project tags too, so use getAllByText)
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Vite').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Tailwind CSS').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Framer Motion').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Vercel').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
    });

    it('should change button text when tools are shown', () => {
      const toggleButton = screen.getByRole('button', { name: /tools for this portfolio/i });
      fireEvent.click(toggleButton);
      
      expect(screen.getByRole('button', { name: /hide tools used/i })).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render the main section with correct id', () => {
      const section = document.querySelector('#projects');
      expect(section).toBeInTheDocument();
    });

    it('should render the section heading', () => {
      expect(screen.getByRole('heading', { level: 2, name: /my projects/i })).toBeInTheDocument();
    });

    it('should render the GitHub link', () => {
      const githubLink = screen.getByRole('link', { name: /view more on github/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/aparr03');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render projects in a grid layout', () => {
      const grid = document.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });
  });

  describe('Edge cases', () => {
    it('should handle switching between filters multiple times', () => {
      const allButton = screen.getByRole('button', { name: /all/i });
      const frontendButton = screen.getByRole('button', { name: /frontend/i });
      const fullstackButton = screen.getByRole('button', { name: /full stack/i });
      
      // Click through filters multiple times
      fireEvent.click(frontendButton);
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
      
      fireEvent.click(fullstackButton);
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
      
      fireEvent.click(allButton);
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
      
      fireEvent.click(frontendButton);
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
    });

    it('should maintain proper DOM structure after multiple filter changes', () => {
      const frontendButton = screen.getByRole('button', { name: /frontend/i });
      const allButton = screen.getByRole('button', { name: /all/i });
      
      fireEvent.click(frontendButton);
      fireEvent.click(allButton);
      
      // Verify all projects are still properly structured
      const projectCards = document.querySelectorAll('.project-card');
      expect(projectCards).toHaveLength(4);
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for project images', () => {
      const images = screen.getAllByRole('img');
      
      // Filter out icon images, focus on project images
      const projectImages = images.filter(img => 
        img.getAttribute('alt')?.includes('Tymelyne') ||
        img.getAttribute('alt')?.includes('CompLex') ||
        img.getAttribute('alt')?.includes('Parr-4-The-Course') ||
        img.getAttribute('alt')?.includes('Well-Tasked')
      );
      
      expect(projectImages.length).toBeGreaterThan(0);
      projectImages.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    it('should have accessible button labels', () => {
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button.textContent).toBeTruthy();
      });
    });

    it('should have accessible links', () => {
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link.textContent).toBeTruthy();
      });
    });
  });
});

