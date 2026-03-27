# Use an official Nginx image (alpine is lightweight)
FROM nginx:alpine

# Copy project files to the Nginx document root
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
