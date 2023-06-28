# Pull nodejs-lts official image from docker hub 
FROM node:lts-slim

# Create app directory
WORKDIR /backend-api

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and files
COPY . .
