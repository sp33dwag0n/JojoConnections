import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";


const catagory = express.Router();

// Make puzzle
catagory.get("/puzzle", async (req, res) => {
    let catagories = await db.collection("catagories");
    let characters = await db.collection("characters");

    let extreme = await catagories.aggregate([
        {$match: { difficulty: 4 }},
        {$sample: { size: 1 }}
    ]).toArray();
    extreme = extreme[0];
    let extremeIds = extreme.characters.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    let hard = await catagories.aggregate([
        {$match: { difficulty: 3, characters: { $not: { $elemMatch: { $in: extremeIds } } } }}
    ]).toArray();
    hard = hard.sort(() => 0.5 - Math.random());
    let hardIds = [];
    for (let i = 0; i < hard.length; i++) {
        hardIds = hard[i].characters.filter(value => !extreme.characters.includes(value));
        if (hardIds.length >= 4) {
            hardIds = hardIds.sort(() => 0.5 - Math.random());
            hardIds = hardIds.slice(0, 4);
            hard = hard[i];
            break;
        }
    }

    let medium = await catagories.aggregate([
        {$match: { difficulty: 2, characters: { $not: { $elemMatch: { $in: extremeIds, $in: hardIds } } } }}
    ]).toArray();
    medium = medium.sort(() => 0.5 - Math.random());
    let mediumIds = [];
    for (let i = 0; i < medium.length; i++) {
        mediumIds = medium[i].characters.filter(value => !extreme.characters.includes(value) && !hard.characters.includes(value));
        if (mediumIds.length >= 4) {
            mediumIds = mediumIds.sort(() => 0.5 - Math.random());
            mediumIds = mediumIds.slice(0, 4);
            medium = medium[i];
            break;
        }
    }

    let easy = await catagories.aggregate([
        {$match: { difficulty: 1, characters: { $not: { $elemMatch: { $in: extremeIds, $in: hardIds, $in: mediumIds } } } }}
    ]).toArray();
    easy = easy.sort(() => 0.5 - Math.random());
    let easyIds = [];
    for (let i = 0; i < easy.length; i++) {
        easyIds = easy[i].characters.filter(value => !extreme.characters.includes(value) && !hard.characters.includes(value) && !medium.characters.includes(value));
        if (easyIds.length >= 4) {
            easyIds = easyIds.sort(() => 0.5 - Math.random());
            easyIds = easyIds.slice(0, 4);
            easy = easy[i];
            break;
        }
    }

    let extremeCharacters = [];
    let hardCharacters = [];
    let mediumCharacters = [];
    let easyCharacters = [];
    for (let i = 0; i < 4; i++) {
        extremeCharacters[i] = await characters.findOne({ _id: ObjectId.createFromHexString(extremeIds[i]) });
        hardCharacters[i] = await characters.findOne({ _id: ObjectId.createFromHexString(hardIds[i]) });
        mediumCharacters[i] = await characters.findOne({ _id: ObjectId.createFromHexString(mediumIds[i]) });
        easyCharacters[i] = await characters.findOne({ _id: ObjectId.createFromHexString(easyIds[i]) });
    }
    
    let results = {};
    results.extreme = extreme.name;
    results.extremeCharacters = extremeCharacters;
    results.hard = hard.name;
    results.hardCharacters = hardCharacters;
    results.medium = medium.name;
    results.mediumCharacters = mediumCharacters;
    results.easy = easy.name;
    results.easyCharacters = easyCharacters;
    res.send(results).status(200);
});

// Get catagory list
catagory.get("/", async (req, res) => {
    let catagories = await db.collection("catagories");
    let results = await catagories.find({}).toArray(); 
    let characters = await db.collection("characters");
    
    let length = results.length
    for (let i = 0; i < length; i++) {
        let characterNameArray = [];
        for (let j = 0; j < results[i].characters.length; j++) {
            let query = { _id: ObjectId.createFromHexString(results[i].characters[j]) };
            let singleCharacter = await characters.findOne(query);
            characterNameArray[j] = singleCharacter.name;
        }
        results[i].characterNames = characterNameArray;
    }
    res.send(results).status(200);
});

// Query one catagory
catagory.get("/:id", async (req, res) => {
    let catagories = await db.collection("catagories");
    let query = { _id: ObjectId.createFromHexString(req.params.id) };
    let result = await catagories.findOne(query);

    if (!result) {
        res.send("Catagory not found").status(404);
    }

    let characters = await db.collection("characters");
    let characterNameArray = [];
    for (let i = 0; i < result.characters.length; i++) {
        let catagoryQuery = { _id: ObjectId.createFromHexString(result.characters[i]) };
        let singleCharacter = await characters.findOne(catagoryQuery);
        characterNameArray[i] = singleCharacter.name;
    }
    result.characterNames = characterNameArray;

    res.send(result).status(200);
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