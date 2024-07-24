import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";


const catagory = express.Router();

// Get catagory list
catagory.get("/", async (req, res) => {
    let catagories = await db.collection("catagories");
    let results = await catagories.find({}).toArray();
    res.send(results).status(200);
});

// Query one catagory
catagory.get("/:id", async (req, res) => {
    let catagories = await db.collection("catagories");
    let query = { _id: ObjectId.createFromHexString(req.params.id) };
    let result = await catagories.findOne(query);

    if (!result) {
        res.send("Catagory not found").status(404);
    } else {
        res.send(result).status(200);
    }
});

// Add catagory
catagory.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            characters: req.body.characters,
            difficulty: Number(req.body.difficulty)
        };

        let catagories = await db.collection("catagories");
        let result = await catagories.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding catagory");
    }
});

// Update catagory
catagory.patch("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId.createFromHexString(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                characters: req.body.characters,
                difficulty: Number(req.body.difficulty)
            }
        };

        let catagories = await db.collection("catagories");
        let result = await catagories.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating catagory")
    }
});

// Delete catagory
catagory.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId.createFromHexString(req.params.id) };

        const catagories = await db.collection("catagories");
        let result = await catagories.deleteOne(query);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting catagory")
    }
});

export default catagory;