import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apartmentsRoutes from './routes/apartments';
import { seedDatabase } from './seed';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend (http://localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Middleware to parse JSON
app.use(express.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Apartment Listing API",
            version: "1.0.0",
            description: "API documentation for apartment listing",
        },
        servers: [
            {
                url: "http://localhost:5000/api/apartments",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/apartments', apartmentsRoutes);

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/apartment-listing')
    .then(async () => {
        console.log('Connected to MongoDB');

        // Seed the database after successful connection
        await seedDatabase(); // Call seed function to populate data

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
