import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Product } from "./models/product.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all products with filtering, sorting, and pagination
app.get("/api/v1/products", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Build filter object
        const filter = {};
        if (req.query.brand) filter.brand = req.query.brand;
        if (req.query.category) filter.category = req.query.category;
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }

        // Build sort object
        const sort = {};
        if (req.query.sort) {
            const [field, order] = req.query.sort.split(':');
            sort[field] = order === 'desc' ? -1 : 1;
        }

        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(filter);

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create product
app.post("/api/v1/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update product
app.put("/api/v1/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete product
app.delete("/api/v1/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Test endpoint to add sample products
app.post("/api/v1/test/products", async (req, res) => {
    try {
        const sampleProducts = Array.from({ length: 20 }, (_, i) => ({
            name: `Product ${i + 1}`,
            brand: `Brand ${Math.floor(i / 4) + 1}`,
            category: `Category ${Math.floor(i / 5) + 1}`,
            price: 99.99 + (i * 10),
            description: `Description for product ${i + 1}`
        }));

        await Product.insertMany(sampleProducts);
        res.status(201).json({ message: "Sample products added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { app };