# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (BuildKit cache speeds up repeated builds)
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY . .

# Build argument for API URL
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Remove .env to prevent overriding build arg (Heroku uses .env, K8s uses build arg)
RUN rm -f .env

# Disable ESLint warnings as errors (CI=false prevents treating warnings as errors)
ENV CI=false
ENV DISABLE_ESLINT_PLUGIN=true

# Build the application
RUN npm run build

# Development stage (use --target development to build this)
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (BuildKit cache speeds up repeated builds)
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY . .

# Expose port 3000 (React dev server)
EXPOSE 3000

# Start with React development server
CMD ["npm", "start"]

# Production stage - DEFAULT (last stage)
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Create non-root user and set ownership
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /usr/share/nginx/html && \
    chown -R nodejs:nodejs /var/cache/nginx && \
    chown -R nodejs:nodejs /var/log/nginx && \
    chown -R nodejs:nodejs /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nodejs:nodejs /var/run/nginx.pid

# Switch to non-root user
USER nodejs

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
