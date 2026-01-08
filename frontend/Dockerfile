# Build stage
FROM node:20-alpine AS build

ARG VITE_API_URL 
ARG VITE_AZURE_CLIENT_ID
ARG VITE_AZURE_TENANT_ID

ENV VITE_API_URL=$VITE_API_URL 
ENV VITE_AZURE_CLIENT_ID=$VITE_AZURE_CLIENT_ID
ENV VITE_AZURE_TENANT_ID=$VITE_AZURE_TENANT_ID

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build



# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html



# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]