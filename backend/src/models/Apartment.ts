import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    unitNumber: { type: Number, required: true },
    project: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: [String], required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },  
    referenceNo: { type: String, required: true },  
    bedrooms: { type: Number, required: true },  
    bathrooms: { type: Number, required: true },  
    deliveryIn: { type: String, required: true },  
    compound: { type: String, required: true },  
    saleType: { type: String, required: true },  
    finishing: { type: String, required: true }  
});


const Apartment = mongoose.model('Apartment', apartmentSchema);

export default Apartment;
