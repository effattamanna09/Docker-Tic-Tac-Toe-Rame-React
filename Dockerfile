# Use an official Node.js image as the base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Fix permissions for esbuild and other binaries
RUN chmod +x node_modules/.bin/*

# Build the application
RUN npm run build

# Stage 2: Serve the app with a lightweight server
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Copy the built files from the previous stage
COPY --from=build /app/dist /app/dist

# Set the working directory to the build output
WORKDIR /app

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5173"]

# Expose the port on which the app will run
EXPOSE 5173
