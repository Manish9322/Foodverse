import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db, restaurants, categories, collections;

async function connectDB() {
  await client.connect();
  db = client.db();
  restaurants = db.collection("restaurants");
  categories = db.collection("categories");
  collections = db.collection("collections");
}
connectDB();

// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  const data = await restaurants.find().toArray();
  res.json(data.map(r => ({ ...r, id: r._id.toString() })));
});

// Add new restaurant
app.post("/api/restaurants", async (req, res) => {
  const result = await restaurants.insertOne(req.body);
  res.json({ ...req.body, id: result.insertedId.toString() });
});

// Update restaurant
app.put("/api/restaurants/:id", async (req, res) => {
  await restaurants.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.json({ ...req.body, id: req.params.id });
});

// Get all categories
app.get("/api/categories", async (req, res) => {
  const data = await categories.find().toArray();
  res.json(data.map(c => ({ ...c, id: c._id.toString() })));
});

// Add new category
app.post("/api/categories", async (req, res) => {
  const result = await categories.insertOne(req.body);
  res.json({ ...req.body, id: result.insertedId.toString() });
});

// Update category
app.put("/api/categories/:id", async (req, res) => {
  await categories.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.json({ ...req.body, id: req.params.id });
});

// Get all collections
app.get("/api/collections", async (req, res) => {
  const data = await collections.find().toArray();
  res.json(data.map(c => ({ ...c, id: c._id.toString() })));
});

// Add new collection
app.post("/api/collections", async (req, res) => {
  const result = await collections.insertOne(req.body);
  res.json({ ...req.body, id: result.insertedId.toString() });
});

// Update collection
app.put("/api/collections/:id", async (req, res) => {
  await collections.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.json({ ...req.body, id: req.params.id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));