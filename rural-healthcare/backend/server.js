const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Rural Healthcare Backend is running!");
});

// Sample facilities data
const facilities = [
    {
        name: "Primary Health Center",
        type: "Primary Care",
        distance: 8,
        time: 20
    },
    {
        name: "Community Health Center",
        type: "Community Care",
        distance: 15,
        time: 35
    },
    {
        name: "District Hospital",
        type: "Hospital",
        distance: 30,
        time: 65
    }
];

// Facilities API
app.get("/api/facilities", (req, res) => {
    res.json(facilities);
});

// Sample routes data
const routes = [
    {
        from: "Village A",
        to: "Primary Health Center",
        distance: 8,
        time: 20
    },
    {
        from: "Village B",
        to: "Community Health Center",
        distance: 15,
        time: 35
    },
    {
        from: "Village C",
        to: "Community Health Center",
        distance: 20,
        time: 45
    },
    {
        from: "Village D",
        to: "District Hospital",
        distance: 30,
        time: 75
    }
];

// Routes API
app.get("/api/routes", (req, res) => {
    res.json(routes);
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});