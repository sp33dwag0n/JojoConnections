import express from "express";
import cors from "cors";
import routes from "./routes/routes.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes);

// Start the express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});