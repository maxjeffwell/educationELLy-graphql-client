# educationELLy GraphQL Client

A modern React-based education management system client application built with Apollo GraphQL, providing a comprehensive interface for managing students and educational data.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [GraphQL API Integration](#graphql-api-integration)
- [Authentication](#authentication)
- [Components Overview](#components-overview)
- [Styling](#styling)
- [Code Quality](#code-quality)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## Features

- **User Authentication**: Secure sign-up, sign-in, and session management
- **Student Management**: Complete CRUD operations for student records
- **Real-time Updates**: Apollo Client cache management for instant UI updates
- **Responsive Design**: Mobile-friendly interface using Semantic UI React
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Protected Routes**: Authorization-based route protection
- **Modern UI**: Clean, intuitive interface with consistent theming

## Technology Stack

- **Frontend Framework**: React 18.3.1
- **State Management**: Apollo Client 3.11.8
- **Routing**: React Router DOM 6.28.0
- **UI Components**: Semantic UI React 2.1.5
- **Styling**: styled-components 4.4.0
- **GraphQL**: GraphQL 15.8.0 with graphql-tag
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Package Manager**: npm

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.x or v20.x recommended)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/educationELLy-graphql.git
cd educationELLy-graphql/educationELLy-graphql-client
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API endpoint:
```
REACT_APP_API_BASE_URL=http://localhost:8000/graphql
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | GraphQL API endpoint URL | `http://localhost:8000/graphql` |

### API Configuration

The API endpoint is configured in `src/config.js` and can be overridden using environment variables. The Apollo Client setup in `src/index.js` handles:
- Authentication token management
- Request/response interceptors
- Error handling and automatic sign-out on 401 errors

## Available Scripts

### Development

```bash
npm start          # Start development server on port 3000
```

### Building

```bash
npm run build      # Create optimized production build
```

### Testing

```bash
npm test           # Run test suite (currently no tests implemented)
```

### Code Quality

```bash
npm run lint       # Check code with ESLint
npm run lint:fix   # Auto-fix ESLint issues
npm run format     # Format code with Prettier
npm run format:check # Check formatting without changes
npm run quality    # Run all quality checks (lint, format, type-check)
```

## Project Structure

```
educationELLy-graphql-client/
├── public/                  # Static assets
│   ├── index.html          # HTML template
│   └── favicon.ico         # App favicon
├── src/
│   ├── components/         # React components
│   │   ├── App/           # Main app component with routing
│   │   ├── CreateStudent/ # Student creation form
│   │   ├── Dashboard/     # Dashboard view
│   │   ├── DeleteStudent/ # Student deletion
│   │   ├── Error/         # Error display component
│   │   ├── ErrorBoundary/ # React error boundary
│   │   ├── Footer/        # App footer
│   │   ├── Header/        # App header
│   │   ├── Landing/       # Landing page
│   │   ├── Loading/       # Loading indicator
│   │   ├── Navigation/    # Navigation menu
│   │   ├── Session/       # Authentication HOCs
│   │   ├── SignIn/        # Sign in page
│   │   ├── SignOut/       # Sign out functionality
│   │   ├── SignUp/        # User registration
│   │   ├── Students/      # Student list view
│   │   └── UpdateStudent/ # Student update form
│   ├── constants/         # App constants
│   │   └── history.js     # Browser history
│   ├── config.js          # Configuration exports
│   ├── index.js           # App entry point
│   └── index.css          # Global styles
├── .env.example           # Environment template
├── .eslintrc.json         # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## GraphQL API Integration

### Queries

- **GET_ME**: Fetches current user information
- **GET_ALL_STUDENTS_QUERY**: Retrieves all students

### Mutations

- **SIGN_IN**: User authentication
- **SIGN_UP**: User registration
- **CREATE_STUDENT_MUTATION**: Create new student
- **UPDATE_STUDENT_MUTATION**: Update student information
- **DELETE_STUDENT_MUTATION**: Remove student

### Apollo Client Setup

The Apollo Client is configured in `src/index.js` with:
- HTTP Link for GraphQL endpoint
- Authentication middleware for token injection
- Error handling with automatic session cleanup
- InMemoryCache for query result caching

## Authentication

### Token Management
- Authentication tokens are stored in `sessionStorage`
- Tokens are automatically included in GraphQL requests via the `x-token` header
- Invalid tokens trigger automatic sign-out

### Protected Routes
Routes requiring authentication are wrapped with the `withAuthorization` HOC:
- `/dashboard`
- `/students`
- `/student/:id`

### Session Management
The `withSession` HOC provides session data to components and handles:
- Current user information
- Loading states
- Authentication status

## Components Overview

### Core Components

- **App**: Main component with routing configuration
- **Navigation**: Responsive navigation menu with authentication-aware links
- **ErrorBoundary**: Catches and displays React errors gracefully

### Authentication Components

- **SignIn**: User login form with error handling
- **SignUp**: Registration form with validation
- **SignOut**: Logout functionality with session cleanup

### Student Management

- **Students**: Paginated list of all students with search functionality
- **CreateStudent**: Form for adding new students
- **UpdateStudent**: Edit existing student information
- **DeleteStudent**: Confirmation and deletion handling

### Utility Components

- **Loading**: Consistent loading indicators
- **Error**: User-friendly error messages
- **Footer**: Application footer
- **Header**: Application header with branding

## Styling

### Theme Configuration

The application uses a custom theme with styled-components:

```javascript
{
  orange: '#fb9438',
  blue: '#2873b4',
  green: '#86c64e',
  white: '#f5f5f5'
}
```

### Styling Approach

- **styled-components**: For component-specific styling
- **Semantic UI React**: For pre-built UI components
- **Global Styles**: Defined in `index.css`
- **Responsive Design**: Mobile-first approach

## Code Quality

### Linting and Formatting

- **ESLint**: Configured with React and accessibility rules
- **Prettier**: Ensures consistent code formatting
- **Husky**: Pre-commit hooks for automatic linting

### Git Hooks

Pre-commit hooks automatically:
1. Run ESLint fixes on staged files
2. Format code with Prettier
3. Block commits if linting fails

### CI/CD Pipeline

GitHub Actions workflow includes:
- Multi-version Node.js testing (18.x, 20.x)
- Linting and format checks
- Test execution with coverage reporting
- Production build verification
- Coverage upload to Codecov

## Deployment

### Heroku Deployment

The project includes Heroku-specific configuration:

1. **Procfile**: Specifies the web process
2. **static.json**: Configures client-side routing
3. **Build Command**: `npm run heroku-postbuild`

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Serving Production Build

```bash
npm install -g serve
serve -s build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code patterns and conventions
- Ensure all linting rules pass
- Add appropriate error handling
- Update documentation as needed
- Test your changes thoroughly

## Troubleshooting

### Common Issues

**Port 3000 Already in Use**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Authentication Errors**
- Check that the API server is running
- Verify the `REACT_APP_API_BASE_URL` is correct
- Clear sessionStorage and try signing in again

**Build Failures**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version compatibility

**GraphQL Errors**
- Check network tab for detailed error messages
- Verify GraphQL schema compatibility
- Ensure authentication token is valid

### Debug Mode

To enable verbose logging:
1. Open browser developer tools
2. Set `localStorage.debug = 'app:*'`
3. Reload the application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Next Steps

### Immediate Priorities

1. **Test Implementation**
   - Add unit tests for all components using React Testing Library
   - Implement integration tests for GraphQL queries/mutations
   - Achieve minimum 80% code coverage

2. **TypeScript Migration**
   - Configure TypeScript properly (tsconfig.json exists but TypeScript not set up)
   - Migrate components incrementally starting with utility components
   - Add proper type definitions for GraphQL schema

3. **Performance Optimization**
   - Implement code splitting for route-based lazy loading
   - Add React.memo to prevent unnecessary re-renders
   - Optimize bundle size by analyzing dependencies

### Feature Enhancements

4. **Enhanced Student Management**
   - Add bulk import/export functionality
   - Implement advanced search and filtering
   - Add student progress tracking and analytics

5. **User Experience Improvements**
   - Add real-time notifications using GraphQL subscriptions
   - Implement offline support with Apollo Cache persistence
   - Add keyboard shortcuts for common actions

6. **Security Enhancements**
   - Implement refresh token mechanism
   - Add rate limiting on the client side
   - Enhance input validation and sanitization

### Technical Debt

7. **Code Organization**
   - Extract GraphQL operations to separate files
   - Create custom hooks for common patterns
   - Implement proper error logging service

8. **Documentation**
   - Add JSDoc comments to all components
   - Create Storybook for component documentation
   - Add API documentation with examples

9. **DevOps Improvements**
   - Set up staging environment
   - Add E2E tests with Cypress
   - Implement automated dependency updates

10. **Accessibility**
    - Conduct full accessibility audit
    - Add ARIA labels where needed
    - Ensure full keyboard navigation support

## Acknowledgments

- Built with Create React App
- UI components from Semantic UI React
- GraphQL powered by Apollo Client

## Meta

**Author**: Jeff Maxwell  
**Repository**: [educationELLy-graphql](https://github.com/maxjeffwell/educationELLy-graphql)  
**Client**: React GraphQL Client  
**License**: MIT  
**Version**: 0.1.0  
**Status**: Development  

### Project Links

- **Backend Repository**: [educationELLy-graphql-server](https://github.com/maxjeffwell/educationELLy-graphql/tree/master/educationELLy-graphql-server)
- **Live Demo**: [educationELLy GraphQL client](https://educationelly-client-graphql-176ac5044d94.herokuapp.com/)
- **Issue Tracker**: [GitHub Issues](https://github.com/maxjeffwell/educationELLy-graphql/issues)

### Contact

- **Email**: maxjeffwell@gmail.com
- **GitHub**: [@maxjeffwell](https://github.com/maxjeffwell)
- **Portfolio:** [https://www.el-jefe.me](https://www.el-jefe.me)