# Apartment Listing App

This project is a simple apartment listing application built using the MERN stack (MongoDB, Express.js, React, Node.js). It includes a backend API to manage apartment listings and a frontend to display them. The application is containerized with Docker Compose for easy setup.

## Project Structure
- **Frontend:** Next.js (React)
- **Backend:** Node.js with Express.js (TypeScript)
- **Database:** MongoDB

## Prerequisites
- Docker and Docker Compose installed

## Setup and Run Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/MinaM99/apartment-listing-app.git
cd apartment-listing-app
```

### 2. Run the Application with Docker Compose
```bash
docker-compose up --build
```
This will start the following services:
- **Frontend:** Runs on `http://localhost:3000`
- **Backend API:** Runs on `http://localhost:5000`
- **MongoDB Database:** Runs on `mongodb://mongo:27017/apartments`

### 3. Endpoints

#### **Swagger API Documentation**
- Visit `http://localhost:5000/api-docs/` to view detailed API documentation via Swagger UI, including information on each API endpoint, request parameters, and response schemas.

#### **Backend API Endpoints**

1. **GET /api/apartments**
   - Retrieve a list of apartments.
   - Responses:
     - 200: A list of apartments

2. **GET /api/apartments/search**
   - Search apartments by project.
   - Query Parameters:
     - `search`: Search query (required).
   - Responses:
     - 200: List of apartments matching the search criteria.
     - 400: Search query is required.

3. **GET /api/apartments/{id}**
   - Retrieve a single apartment by ID.
   - Parameters:
     - `id`: Apartment ID (required).
   - Responses:
     - 200: Apartment details.
     - 404: Apartment not found.

4. **POST /api/apartments**
   - Create a new apartment.
   - Request Body Example:
     ```json
     {
        "title": "Luxury Studio Apartment",
        "unitNumber": 1,
        "project": "sodic",
        "description": "A modern studio located in downtown Cairo with access to all amenities.",
        "imageUrl": [
            "https://www.apartments.com/blog/sites/default/files/styles/medium/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=CFMHUgSx",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 7200000,
        "location": "Cairo",
        "size": "65m²",
        "referenceNo": "54980",
        "bedrooms": 1,
        "bathrooms": 1,
        "deliveryIn": "2025",
        "compound": "Downtown Residence",
        "saleType": "Developer Sale",
        "finishing": "Finished"
    }
     ```
   - Responses:
     - 201: Apartment created successfully.
     - 400: Invalid request.

5. **POST /api/apartments/bulk**
   - Create multiple apartments.
   - Request Body Example (Array of apartments):
     ```json
     [
       { "title": "Apartment 1", "unitNumber": "101", "project": "Sunset Compound", ... },
       { "title": "Apartment 2", "unitNumber": "102", "project": "Sunset Compound", ... }
     ]
     ```
   - Responses:
     - 201: Apartments created successfully.
     - 400: Invalid request.

6. **DELETE /api/apartments/{id}**
   - Delete an apartment by ID.
   - Parameters:
     - `id`: Apartment ID (required).
   - Responses:
     - 200: Apartment deleted successfully.
     - 404: Apartment not found.

7. **DELETE /api/apartments**
   - Delete all apartments.
   - Responses:
     - 200: All apartments deleted successfully.

#### **Frontend**
- Visit `http://localhost:3000` to access the apartment listing page and view details of individual apartments.

## MongoDB Setup
The MongoDB service will automatically start and have initial apartment data loaded when the container runs.

## Technologies Used
- **Frontend:** Next.js, React, CSS Modules
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB
- **Docker:** For containerizing the application
- **Swagger:** API documentation


