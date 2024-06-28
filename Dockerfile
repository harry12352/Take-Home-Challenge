# Use the official Node.js image.
FROM node:14


# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install the app dependencies.
RUN npm install

# Copy the rest of the app's source code.
COPY . .

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/src/app/

# Give execution permissions to the entrypoint script
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Expose the app port.
EXPOSE 3000

# Run the entrypoint script
ENTRYPOINT ["./docker-entrypoint.sh"]
