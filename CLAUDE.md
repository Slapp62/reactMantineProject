# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IsraJobs is a full-stack job board application for the Israeli market, featuring a React/TypeScript frontend with Mantine UI and a Node.js/Express backend with MongoDB. The application supports two main user types: job seekers and businesses, with job listings, favorites, and user profiles.

## Repository Structure

- `frontend/` - React TypeScript application with Mantine UI
- `backend/` - Node.js Express API server with MongoDB

## Development Commands

### Frontend (run from `frontend/` directory)
- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run typecheck` - Run TypeScript type checking without emitting files
- `npm run lint` - Run both ESLint and Stylelint
- `npm run eslint` - Run ESLint on TypeScript/TSX files
- `npm run stylelint` - Run Stylelint on CSS files
- `npm run prettier` - Check code formatting
- `npm run prettier:write` - Fix code formatting
- `npm run vitest` - Run tests once
- `npm run vitest:watch` - Run tests in watch mode
- `npm run test` - Full test pipeline (typecheck + prettier + lint + vitest + build)

### Backend (run from `backend/` directory)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Architecture

### Frontend Architecture
- **State Management**: Redux Toolkit with Redux Persist (session storage)
  - `authSlice` - User authentication state
  - `jobseekerSlice` - Job seeker profile data
  - `businessSlice` - Business profile data  
  - `listingSlice` - Job listings data
  - `searchSlice` - Search and filter state (not persisted)
- **Routing**: React Router v7 with route guards for protected pages
- **UI Framework**: Mantine v7 with custom CSS modules
- **Forms**: React Hook Form with Joi validation
- **Testing**: Vitest with Testing Library setup

### Backend Architecture
- **Framework**: Express.js with ES modules
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcryptjs for password hashing
- **API Structure**: RESTful routes organized by resource (`/api/auth`, `/api/users`, `/api/listings`)

### Key Types
- `TUser` - Base authentication user
- `TJobseeker` - Job seeker profile extending user
- `TBusiness` - Business profile extending user  
- `TJobListing` - Job posting data
- `TDecodedToken` - JWT payload structure

### Route Protection
- `RouteGuard` component protects authenticated routes
- `isBusiness` prop restricts to business users only
- `isAdmin` prop restricts to admin users (currently commented out)

## Configuration Notes

- Frontend uses path aliases: `@/*` maps to `./src/*`
- TypeScript strict mode enabled with comprehensive type checking
- ESLint extends Mantine configuration
- CORS configured for localhost:5173 (frontend dev server)
- MongoDB connection via environment variable `MONGO_URI`

## Current Development Status

Several features are temporarily disabled (commented out):
- Edit profile functionality 
- Admin controls
- Edit listing functionality

The codebase uses modern React patterns with hooks, TypeScript for type safety, and follows a clear separation between frontend and backend with a REST API architecture.