# Step 1: Build the React app using Node.js and Vite
FROM node:21-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app
COPY package-lock.json /app  
RUN npm install


# Copy the rest of the React app and build it using Vite
COPY . /app
RUN npm run build  

# Step 2: Use an Nginx server to serve the built app
FROM nginx:alpine

# Copy the build folder from the first stage to Nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app to be served
EXPOSE 80

# Nginx will automatically serve the content from /usr/share/nginx/html
