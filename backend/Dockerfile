# Use a specific version of Node.js for consistency
FROM node:14

# Set the working directory
WORKDIR /app

# Copy only package.json and tsconfig.json first for better caching of dependencies
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY ./src ./src

# Expose the backend service port
EXPOSE 5000

# Start the server by default
CMD ["npx", "ts-node", "src/server.ts"]
