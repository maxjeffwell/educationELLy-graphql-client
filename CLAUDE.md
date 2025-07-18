# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

educationELLy is a React-based GraphQL client application for education management. It uses Apollo Client to communicate with a GraphQL backend API.

## Essential Commands

### Development
```bash
npm start          # Start development server (port 3000)
npm run build      # Create production build (ESLint disabled)
npm test           # Run tests (currently no tests implemented)
```

### Code Quality
```bash
npm run lint       # Run ESLint checks (max-warnings 0)
npm run lint:fix   # Auto-fix ESLint issues
npm run format     # Format code with Prettier
npm run format:check # Check formatting without changes
npm run quality    # Run all quality checks (lint, format, type-check)
```

### Single Test Execution
```bash
npm test -- --testNamePattern="test name"  # Run specific test by name
npm test -- path/to/test.js               # Run specific test file
```

## Architecture

### Technology Stack
- **Frontend**: React 18.3.1 with React Router 6.28.0
- **State Management**: Apollo Client 3.11.8 for GraphQL
- **UI Framework**: Semantic UI React 2.1.5
- **Styling**: styled-components 4.4.0
- **Build Tool**: Create React App (react-scripts 5.0.1)

### Project Structure
```
src/
├── index.js              # App entry point, Apollo Client setup
├── components/           # Feature-based component organization
│   ├── App/             # Main app component with routing
│   ├── Session/         # Authentication HOCs and session management
│   ├── Students/        # Student CRUD operations
│   └── [Feature]/       # Other feature components
└── constants/           # Application constants
```

### Key Architectural Patterns

1. **Apollo Client Configuration** (src/index.js:30-73)
   - HTTP link with environment-based API URL
   - Authentication via x-token header in localStorage
   - Error handling with automatic sign-out on 401 errors
   - InMemoryCache for query caching

2. **Session Management**
   - withSession HOC wraps the main App component
   - Token stored in localStorage
   - Automatic token injection in Apollo requests

3. **Routing Structure** (src/components/App/index.js:58-67)
   - Public routes: /, /signin, /signup
   - Protected routes: /dashboard, /students, /student/*
   - Session prop passed to Navigation component

4. **Component Organization**
   - Each feature has its own directory
   - Components use Semantic UI React for consistent UI
   - Global styles defined with styled-components

## Development Workflow

### Git Hooks (Husky + lint-staged)
Pre-commit hooks automatically:
- Run ESLint fixes on staged .js/.jsx files
- Format code with Prettier
- Block commits if linting fails

### CI/CD Pipeline
GitHub Actions workflow runs on push/PR to main/master/develop:
1. Tests on Node.js 18.x and 20.x
2. Linting and format checks
3. Type checking (placeholder)
4. Test execution with coverage
5. Production build verification
6. Coverage upload to Codecov

### Environment Configuration
- API endpoint configured via REACT_APP_API_BASE_URL in .env
- Default: http://localhost:8000/graphql

## Important Notes

1. **No TypeScript**: Despite configuration references, TypeScript is not set up
2. **No Tests**: Test infrastructure exists but no actual tests implemented
3. **ESLint Disabled in Build**: Production builds skip ESLint checks
4. **GraphQL Operations**: Use Apollo Client hooks (useQuery, useMutation) for all API calls
5. **Authentication Flow**: Token management handled automatically by Apollo link configuration