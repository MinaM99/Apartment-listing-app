import mongoose from 'mongoose';
import Apartment from './models/Apartment'; // Adjust the path to your Apartment model as needed

// MongoDB connection string
const mongoURI = 'mongodb://mongo:27017/apartment-listing'; // Change 'your_database_name' to your actual database name

const apartmentsData = [
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
    },
    {
        "title": "3-Bedroom Family Apartment",
        "unitNumber": 2,
        "project": "Palm Hills",
        "description": "Spacious 3-bedroom apartment in Zamalek with a beautiful Nile view.",
        "imageUrl": [
            "https://images.ctfassets.net/pg6xj64qk0kh/mwsUhyGswLjXMSLoDfpqH/529760a3f4cd85c5c3eb8f7b6c13a67d/camden-tempe-apartments-tempe-az-west-pool-and-loungers.jpg?w=1098",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 2500000,
        "location": "Zamalek, Cairo",
        "size": "150m²",
        "referenceNo": "54981",
        "bedrooms": 3,
        "bathrooms": 2,
        "deliveryIn": "2026",
        "compound": "Nile View Compound",
        "saleType": "Resale",
        "finishing": "Semi-Finished"
    },
    {
        "title": "Cozy 1-Bedroom Apartment",
        "unitNumber": 3,
        "project": "Mountain View",
        "description": "Cozy apartment in Maadi, ideal for single professionals.",
        "imageUrl": [
            "https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_lg/66949b440e1405e3bad05f6c13426000",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 6000000,
        "location": "Maadi, Cairo",
        "size": "80m²",
        "referenceNo": "54982",
        "bedrooms": 1,
        "bathrooms": 1,
        "deliveryIn": "2024",
        "compound": "Maadi Hills",
        "saleType": "Developer Sale",
        "finishing": "Finished"
    },
    {
        "title": "Penthouse with Rooftop Garden",
        "unitNumber": 4,
        "project": "Hassan Allam",
        "description": "A luxurious penthouse in 6th of October City with a private rooftop garden.",
        "imageUrl": [
            "https://cache.marriott.com/marriottassets/MEA/bangkok_bkksp_4unit_ITO_2.1.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=600px:*",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 5000000,
        "location": "6th of October City",
        "size": "200m²",
        "referenceNo": "54983",
        "bedrooms": 4,
        "bathrooms": 3,
        "deliveryIn": "2025",
        "compound": "Rooftop Gardens",
        "saleType": "Developer Sale",
        "finishing": "Finished"
    },
    {
        "title": "2-Bedroom Apartment in Sheikh Zayed",
        "unitNumber": 5,
        "project": "Marakez",
        "description": "Modern 2-bedroom apartment in a gated community in Sheikh Zayed.",
        "imageUrl": [
            "https://cache.marriott.com/marriottassets/MEA/MEA_Xian_China.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=600px:*",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 1800000,
        "location": "Sheikh Zayed, Giza",
        "size": "120m²",
        "referenceNo": "54984",
        "bedrooms": 2,
        "bathrooms": 2,
        "deliveryIn": "2026",
        "compound": "Zayed Heights",
        "saleType": "Developer Sale",
        "finishing": "Semi-Finished"
    },
    {
        "title": "Spacious 4-Bedroom Apartment",
        "unitNumber": 6,
        "project": "Mivida",
        "description": "A spacious 4-bedroom apartment with a balcony overlooking the city.",
        "imageUrl": [
            "https://cdn.confident-group.com/wp-content/uploads/2023/08/09144221/shutterstock_436927078.jpg",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 3000000,
        "location": "Downtown Cairo",
        "size": "250m²",
        "referenceNo": "54985",
        "bedrooms": 4,
        "bathrooms": 3,
        "deliveryIn": "2024",
        "compound": "Mivida Compound",
        "saleType": "Resale",
        "finishing": "Finished"
    },
    {
        "title": "Elegant 2-Bedroom Apartment",
        "unitNumber": 7,
        "project": "Emaar",
        "description": "A stylish 2-bedroom apartment in New Cairo with modern interior design.",
        "imageUrl": [
            "https://cdn.sanity.io/images/v48q37k7/production/d09208183125ab47493d5de2f8710b6faa27d7cc-3000x2000.jpg?auto=format&fit=max&q=90&w=1500",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 2200000,
        "location": "New Cairo",
        "size": "110m²",
        "referenceNo": "54986",
        "bedrooms": 2,
        "bathrooms": 2,
        "deliveryIn": "2027",
        "compound": "Emaar Residence",
        "saleType": "Developer Sale",
        "finishing": "Finished"
    },
    {
        "title": "Modern Duplex Apartment",
        "unitNumber": 8,
        "project": "El Gouna",
        "description": "A modern duplex with stunning views of the Red Sea in El Gouna.",
        "imageUrl": [
            "https://d3oo9u3p09egds.cloudfront.net/filters:format(webp)/rental_property/colina-villa-h/01_Facade__10_.jpeg",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 4500000,
        "location": "El Gouna, Red Sea",
        "size": "180m²",
        "referenceNo": "54987",
        "bedrooms": 3,
        "bathrooms": 2,
        "deliveryIn": "2025",
        "compound": "El Gouna Resort",
        "saleType": "Resale",
        "finishing": "Finished"
    },
    {
        "title": "Charming 1-Bedroom Apartment",
        "unitNumber": 9,
        "project": "Zed East",
        "description": "Charming 1-bedroom apartment located in the heart of New Cairo.",
        "imageUrl": [
            "https://www.maramani.com/cdn/shop/articles/ID_24402-1.jpg?v=1700459989&width=1500",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 8200000,
        "location": "New Cairo",
        "size": "75m²",
        "referenceNo": "54988",
        "bedrooms": 1,
        "bathrooms": 1,
        "deliveryIn": "2024",
        "compound": "Zed East",
        "saleType": "Developer Sale",
        "finishing": "Finished"
    },
    {
        "title": "3-Bedroom Villa",
        "unitNumber": 10,
        "project": "Sodic",
        "description": "A beautiful 3-bedroom villa with a private garden in West Cairo.",
        "imageUrl": [
            "https://vaarivana.com/wp-content/uploads/2023/05/Unveiling_the_Splendor.jpg.webp",
            "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
            "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
        ],
        "price": 5000000,
        "location": "6th of October City",
        "size": "220m²",
        "referenceNo": "54989",
        "bedrooms": 3,
        "bathrooms": 3,
        "deliveryIn": "2025",
        "compound": "Sodic West",
        "saleType": "Developer Sale",
        "finishing": "Finished"
    }
];

export async function seedDatabase(){
    try {
        await Apartment.deleteMany(); // Clear existing data
        console.log('Existing apartments cleared.');
        const result = await Apartment.insertMany(apartmentsData);
        console.log(`${result.length} apartments added to the database.`);
        
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}


