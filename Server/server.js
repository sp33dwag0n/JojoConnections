import express from "express";
import cors from "cors";
import character from "./routes/character.js"
import catagory from "./routes/catagory.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/character", character);
app.use("/catagory", catagory);

// Start the express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});