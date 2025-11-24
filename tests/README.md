# Test Suite

This directory contains unit tests for the portfolio project using Vitest and React Testing Library.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

## Test Files

### projects.spec.tsx
Comprehensive unit tests for the Projects component covering:

#### 1. `getAvailableFilters()` Method Tests
- **Dynamic Filter Display**: Verifies that only filters with associated projects are shown
- **"All" Filter Always Visible**: Ensures the "All" filter is always displayed
- **Category Filtering**: Confirms filters match existing project categories

#### 2. `filteredProjects` Logic Tests
- **Default All Projects**: Tests that all projects display when "All" filter is active
- **Frontend Filtering**: Verifies frontend-only projects are shown when Frontend filter is clicked
- **Full Stack Filtering**: Tests full stack project filtering
- **Filter Reset**: Ensures returning to "All" shows all projects again

#### 3. Filter Button State Tests
- **Active State**: Tests active/inactive styling on filter buttons
- **State Transitions**: Verifies proper state changes when switching filters

#### 4. Project Data Rendering Tests
- **Titles and Descriptions**: Validates all project information renders correctly
- **Tags Display**: Tests that project tags are displayed properly (up to 5 tags shown)
- **Links**: Verifies Live Demo and View Code links are present and correct

#### 5. Tools Toggle Functionality Tests
- **Toggle Behavior**: Tests showing/hiding the tools section
- **Tools Display**: Verifies all 6 portfolio tools are displayed when section is open
- **Button Text Changes**: Tests that button text updates based on toggle state

#### 6. Component Structure Tests
- **Section ID**: Verifies the projects section has the correct ID
- **Heading**: Tests that the main heading renders
- **GitHub Link**: Validates the GitHub link attributes
- **Grid Layout**: Confirms projects are in a responsive grid

#### 7. Edge Cases Tests
- **Multiple Filter Switches**: Tests rapid filter changes
- **DOM Structure Integrity**: Verifies DOM remains consistent after multiple changes

#### 8. Accessibility Tests
- **Alt Text**: Ensures images have proper alt attributes
- **Button Labels**: Verifies all buttons have accessible labels
- **Link Accessibility**: Tests that all links have proper text content

## Test Configuration

- **Framework**: Vitest
- **Testing Library**: @testing-library/react
- **Environment**: jsdom
- **Setup File**: `tests/setup.ts` (includes mocks for IntersectionObserver and ResizeObserver)

## Key Test Utilities

- **IntersectionObserver Mock**: Required for Framer Motion's `whileInView` feature
- **ResizeObserver Mock**: Required for responsive animations

## Coverage

The test suite for `Projects.tsx` includes:
- ✅ 31 unit tests
- ✅ All internal methods tested
- ✅ User interactions tested
- ✅ Edge cases covered
- ✅ Accessibility validated

## Notes

- Placeholder tests exist for other components (About, Contact, Home, etc.) and should be expanded in the future
- The test suite uses `getAllByText` for elements that appear multiple times (e.g., tool names in both project tags and tools section)

