
import { MongoClient } from "mongodb";
const uri = "mongodb+srv://jojoconnectionsadmin:tokiwotomare69@jojoconnections.c7yqm8w.mongodb.net/?retryWrites=true&w=majority&appName=JojoConnections";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const db = client.db('JojoConnections');
        const characters = db.collection('Characters');
        
        // Add
        // const doc = {
        //     name: "Robert E.O. Speedwagon"
        // }
        // await characters.insertOne(doc);

        // Get
        const query = {};
        const characterList = await characters.find(query).toArray();

        console.log(characterList);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
