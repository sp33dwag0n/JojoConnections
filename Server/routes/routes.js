import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";


const router = express.Router();

// Get character list
router.get("/character", async (req, res) => {
    let characters = await db.collection("Characters");
    let results = await characters.find({}).toArray();
    res.send(results).status(200);
});

// Query one character
router.get("/character/:id", async (req, res) => {
    let characters = await db.collection("Characters");
    let query = { _id: ObjectId.createFromHexString(req.params.id) };
    let result = await characters.findOne(query);

    if (!result) {
        res.send("Character not found").status(404);
    } else {
        res.send(result).status(200);
    }
});

// Add character
router.post("/character", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            part: Number(req.body.part)
        };

        let characters = await db.collection("Characters");
        let result = await characters.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding character");
    }
});

// Update character
router.patch("/character/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId.createFromHexString(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                part: Number(req.part.name),
            }
        };

        let characters = await db.collection("Characters");
        let result = await characters.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating character")
    }
});

// Delete character
router.delete("/character/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId.createFromHexString(req.params.id) };

        const characters = await db.collection("Characters");
        let result = await characters.deleteOne(query);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting character")
    }
});

export default router;