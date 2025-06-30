# Vue Components - NuxtUI Replacement

This document outlines the Vue components created to replace NuxtUI dependencies with inline SVG implementations.

## Components Overview

### 1. SearchInput.vue
A search input component with suggestion dropdown and loading states.

**Features:**
- Inline SVG search icon (replaces NuxtUI Icon)
- Suggestion dropdown with search results
- Loading spinner animation
- Keyboard navigation support
- Click-outside handling
- Accessibility with ARIA labels

**Props:**
- `placeholder` (String): Input placeholder text
- `suggestions` (Array): Array of suggestion objects
- `loading` (Boolean): Loading state
- `modelValue` (String): v-model value

**Events:**
- `update:modelValue`: Emitted when input value changes
- `search`: Emitted when search is triggered
- `select`: Emitted when suggestion is selected

**Usage:**
```vue
<SearchInput
  v-model="searchValue"
  placeholder="Search for minerals..."
  :suggestions="searchSuggestions"
  :loading="isLoading"
  @search="handleSearch"
  @select="handleSuggestionSelect"
/>
```

### 2. CzechMap.vue
Interactive SVG map component for Czech Republic region selection.

**Features:**
- Inline SVG back arrow button (replaces NuxtUI Icon)
- Interactive SVG map regions
- Hover effects and tooltips
- Region selection with visual feedback
- Keyboard navigation support
- Accessibility with ARIA labels

**Props:**
- `regions` (Array): Custom regions data (optional)
- `selectedRegion` (String): Currently selected region ID
- `showBackButton` (Boolean): Show/hide back button

**Events:**
- `select-region`: Emitted when region is selected
- `back`: Emitted when back button is clicked

**Usage:**
```vue
<CzechMap
  :selected-region="selectedRegion"
  @select-region="handleRegionSelect"
  @back="handleBack"
/>
```

### 3. ServiceCategories.vue
Grid layout component for service category selection.

**Features:**
- Inline SVG back arrow and selection arrows (replaces NuxtUI Icon)
- Responsive grid layout
- Category selection with visual feedback
- Hover animations and effects
- Configurable column count
- Accessibility with ARIA labels

**Props:**
- `categories` (Array): Custom categories data (optional)
- `selectedCategory` (String): Currently selected category ID
- `showBackButton` (Boolean): Show/hide back button
- `columns` (Number): Number of grid columns

**Events:**
- `select-category`: Emitted when category is selected
- `back`: Emitted when back button is clicked

**Usage:**
```vue
<ServiceCategories
  :selected-category="selectedCategory"
  :columns="3"
  @select-category="handleCategorySelect"
  @back="handleBack"
/>
```

### 4. LoadingSpinner.vue
Custom loading spinner component to replace NuxtLoadingIndicator.

**Features:**
- Pure CSS/SVG animated spinner
- Configurable size, color, thickness, and speed
- Smooth animations
- Accessibility with proper ARIA labels

**Props:**
- `size` (String): Size variant ('sm', 'md', 'lg')
- `color` (String): Color hex value
- `thickness` (Number): Stroke thickness
- `speed` (String): Animation speed ('slow', 'normal', 'fast')

**Usage:**
```vue
<LoadingSpinner size="md" color="#3b82f6" speed="normal" />
```

### 5. Enhanced App.vue
Updated main application layout with custom loading and step management.

**Features:**
- Custom loading overlay using LoadingSpinner
- Step-based navigation system
- Error handling and display
- Progress indicators with inline SVG
- Global state management
- Accessibility improvements

**New Features Added:**
- Global loading overlay
- Step progress indicator
- Error message display
- Navigation header
- Mobile menu support

## Technical Implementation

### SVG Icons
All components use inline SVG elements instead of external icon libraries:
- Search icon in SearchInput
- Back arrow icons in CzechMap and ServiceCategories
- Loading spinner animation
- Navigation and UI icons in App.vue
- Progress step indicators

### Styling
- Tailwind CSS classes for consistent styling
- Fallback CSS for basic styles when Tailwind is unavailable
- Responsive design with mobile-first approach
- Smooth transitions and animations
- Hover effects and focus states

### Accessibility
- Proper ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management and visual indicators
- Screen reader compatibility
- Semantic HTML structure

### TypeScript Support
- Full TypeScript compatibility
- Prop validation and type checking
- Event type definitions
- Computed properties with proper typing

## Testing

A test page (`pages/test-components.vue`) is included to verify all component functionality:
- Interactive component demos
- Event handling examples
- State management testing
- Visual verification

Run the verification script:
```bash
./verify-components.sh
```

## Migration from NuxtUI

### Removed Dependencies
- `<Icon>` components → Inline SVG elements
- `<NuxtLoadingIndicator>` → Custom LoadingSpinner component

### Benefits
- No external icon library dependencies
- Better performance with inline SVG
- Full control over icon styling and animations
- Improved accessibility
- Smaller bundle size
- Better SEO with semantic SVG markup

## Browser Support
- Modern browsers with SVG support
- CSS Grid and Flexbox support
- CSS animations and transitions
- ES6+ JavaScript features

## Future Enhancements
- Additional SVG icon variants
- Theme customization
- Animation options
- More grid layout options
- Custom tooltip styles