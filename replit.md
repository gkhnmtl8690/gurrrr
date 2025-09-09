# Musical Instruments App

## Overview

This is a full-stack web application that showcases musical instruments from different cultures, allowing users to browse, filter, and play audio samples of various instruments. The app features Turkish and foreign instruments categorized by type (percussion, string, wind, keyboard, and bowed instruments), with an interactive audio player and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite for build tooling and development server
- **Routing**: Wouter for client-side routing with minimal bundle size
- **UI Components**: Radix UI primitives with shadcn/ui styling system for consistent, accessible components
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design
- **State Management**: TanStack Query for server state management and caching
- **Audio Handling**: Custom audio hook (`useAudio`) managing HTML5 audio playback with global volume control

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API with endpoints for instrument retrieval and filtering
- **Data Storage**: In-memory storage with seeded instrument data (MemStorage class implementing IStorage interface)
- **Development**: Hot module replacement via Vite integration for seamless development experience

### Database Schema (Drizzle ORM)
- **ORM**: Drizzle ORM with PostgreSQL dialect configured for production deployment
- **Schema**: Instruments table with id, name, description, origin, category, audioFile, imageUrl, and isActive fields
- **Types**: Strongly typed with TypeScript enums for instrument origins and categories

### Component Architecture
- **Layout**: Single-page application with tab-based navigation between Turkish and foreign instruments
- **Filtering**: Category-based filtering with icon-based navigation (All, Percussion, String, Bowed, Wind, Keyboard)
- **Audio Player**: Centralized audio management preventing multiple simultaneous playback
- **Cards**: Instrument cards with lazy-loaded images, descriptions, and play/pause functionality

### Development Tools
- **Build System**: Vite with React plugin, esbuild for server bundling
- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Code Quality**: Path aliases for clean imports, component composition patterns
- **Error Handling**: Runtime error overlay for development, graceful error boundaries

## External Dependencies

### UI and Styling
- **Radix UI**: Complete set of accessible, unstyled UI primitives for dialogs, dropdowns, tooltips, and form controls
- **Tailwind CSS**: Utility-first CSS framework with custom design system configuration
- **Lucide React**: Icon library for consistent iconography throughout the application
- **class-variance-authority**: Type-safe variant API for component styling

### Data Management
- **TanStack Query**: Server state synchronization with caching, background updates, and offline support
- **Drizzle ORM**: Lightweight TypeScript ORM with schema validation and migrations
- **Zod**: Schema validation for type-safe data parsing and form validation

### Development and Build
- **Vite**: Build tool with hot module replacement, optimized bundling, and development server
- **TypeScript**: Static type checking with strict configuration
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

### Database Integration
- **Neon Database**: Serverless PostgreSQL with connection pooling
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Audio and Media
- **Native HTML5 Audio API**: For audio playback without external dependencies
- **Embla Carousel**: Lightweight carousel component for potential future image galleries

### Utilities
- **date-fns**: Date manipulation and formatting utilities
- **nanoid**: Secure URL-friendly unique string generation
- **clsx**: Utility for constructing className strings conditionally