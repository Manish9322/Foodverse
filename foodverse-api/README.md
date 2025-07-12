# Foodverse API

A simple Express + MongoDB backend for Foodverse.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your MongoDB Atlas URI (already provided):
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   ```
3. Start the server:
   ```bash
   npm start
   ```

The API will run on port 5000 by default.

## Endpoints
- `GET /api/restaurants` — List all restaurants
- `POST /api/restaurants` — Add a new restaurant
- `PUT /api/restaurants/:id` — Update a restaurant
