const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/health", (req, res) => {
    res.json({
        status: "UP",
        service: "RUSL Portal API"
    });
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});