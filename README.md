# Email Core Engine

## Requirements

- Docker
- Docker Compose

## Environment Variables

Create a `.env` file with the following variables:

PORT=3000
ELASTICSEARCH_HOST=http://localhost:9200
OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
REDIRECT_URI=http://localhost:3000/callback

## items to add beforing running app
ELASTICSEARCH_HOST
OUTLOOK_CLIENT_ID
OUTLOOK_CLIENT_SECRET
These are items are present in .env file


## Running the Application

1. Build and run the application:

## bash command
docker-compose build
docker-compose up 


