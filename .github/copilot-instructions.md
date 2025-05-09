<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AushadhiAI - Target Selection Application

This project is a Next.js application for a drug discovery platform. Here are some specific instructions for GitHub Copilot:

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable React components 
- `/src/services` - API services and utilities

## Technology Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Axios for API requests

## Key Features

1. Target Selection Page - Users enter a disease name for screening
2. Interactive Loading Animation - Shown during the screening process
3. Results Page - Displays potential drug targets with confidence scores

## API Integration

The application includes a mock API service in `/src/services/api.ts`. When generating code that integrates with the backend, make suggestions that align with the existing API interface structure.

## UI/UX Guidelines

- Professional, clean, and medical-themed design
- Responsive layouts for all device sizes
- Use of animations for better user experience
- Accessible design practices

## Best Practices

- Use TypeScript types/interfaces for all components and functions
- Implement error handling for API calls
- Use React hooks appropriately
- Follow Next.js best practices for routing and data fetching
- Use Tailwind CSS utility classes for styling
