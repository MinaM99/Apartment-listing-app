import express from 'express';
import Apartment from '../models/Apartment';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of apartments
 *     responses:
 *       200:
 *         description: A list of apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartment'
 */
router.get('/', async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for apartments by project
 *     parameters:
 *       - name: search
 *         in: query
 *         required: true
 *         description: Search query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of apartments that match the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartment'
 *       400:
 *         description: Search query is required
 */
router.get('/search', async (req, res) => {
    const { search } = req.query;

    try {
        if (!search) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Perform the search by project only
        const apartments = await Apartment.find({
            project: { $regex: search, $options: 'i' } // Case-insensitive search in project
        });

        res.json(apartments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});




/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a single apartment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the apartment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apartment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found
 */
router.get('/:id', async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
        res.json(apartment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new apartment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       400:
 *         description: Invalid request
 */
router.post('/', async (req, res) => {
    const newApartment = new Apartment(req.body);

    try {
        const savedApartment = await newApartment.save();
        res.status(201).json(savedApartment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /bulk:
 *   post:
 *     summary: Create multiple apartments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Apartment'
 *     responses:
 *       201:
 *         description: Apartments created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartment'
 *       400:
 *         description: Invalid request
 */
router.post('/bulk', async (req, res) => {
    const apartmentsData = req.body;

    try {
        const savedApartments = await Apartment.insertMany(apartmentsData);
        res.status(201).json(savedApartments);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete an apartment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the apartment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apartment deleted successfully
 *       404:
 *         description: Apartment not found
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedApartment = await Apartment.findByIdAndDelete(req.params.id);
        if (!deletedApartment) return res.status(404).json({ message: 'Apartment not found' });
        res.json({ message: 'Apartment deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete all apartments
 *     responses:
 *       200:
 *         description: All apartments deleted successfully
 */
router.delete('/', async (req, res) => {
    try {
        await Apartment.deleteMany();
        res.json({ message: 'All apartments deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Apartment:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Luxury Studio Apartment"
 *         unitNumber:
 *           type: integer
 *           example: 1
 *         project:
 *           type: string
 *           example: "sodic"
 *         description:
 *           type: string
 *           example: "A modern studio located in downtown Cairo with access to all amenities."
 *         imageUrl:
 *           type: array
 *           items:
 *             type: string
 *           example: [
 *             "https://www.apartments.com/blog/sites/default/files/styles/medium/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=CFMHUgSx",
 *             "https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg",
 *             "https://www.pmcpropertygroup.com/sites/default/files/styles/slider-image/public/property-images/Schenley%20Lease-Up_043__0.jpg?itok=tZyUrkuR&timestamp=1567194149"
 *           ]
 *         location:
 *           type: string
 *           example: "Downtown Cairo"
 *         price:
 *           type: number
 *           example: 2000000
 *         size:
 *           type: string
 *           example: "65 m²"
 *         referenceNo:
 *           type: string
 *           example: "54980"
 *         bedrooms:
 *           type: integer
 *           example: 1
 *         bathrooms:
 *           type: integer
 *           example: 1
 *         deliveryIn:
 *           type: string
 *           example: "2025"
 *         compound:
 *           type: string
 *           example: "Downtown Residence"
 *         saleType:
 *           type: string
 *           example: "Developer Sale"
 *         finishing:
 *           type: string
 *           example: "Fully Finished"
 */

export default router;
