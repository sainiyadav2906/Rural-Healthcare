const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Healthcare facilities
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

// Routes between villages and healthcare facilities
const routes = [
    // Village A
    {
        from: "Village A",
        to: "Primary Health Center",
        distance: 8,
        time: 20
    },
    {
        from: "Village A",
        to: "Community Health Center",
        distance: 15,
        time: 35
    },
    {
        from: "Village A",
        to: "District Hospital",
        distance: 30,
        time: 65
    },

    // Village B
    {
        from: "Village B",
        to: "Primary Health Center",
        distance: 10,
        time: 25
    },
    {
        from: "Village B",
        to: "Community Health Center",
        distance: 15,
        time: 35
    },
    {
        from: "Village B",
        to: "District Hospital",
        distance: 32,
        time: 70
    },

    // Village C
    {
        from: "Village C",
        to: "Primary Health Center",
        distance: 12,
        time: 30
    },
    {
        from: "Village C",
        to: "Community Health Center",
        distance: 20,
        time: 45
    },
    {
        from: "Village C",
        to: "District Hospital",
        distance: 35,
        time: 75
    },

    // Village D
    {
        from: "Village D",
        to: "Primary Health Center",
        distance: 15,
        time: 35
    },
    {
        from: "Village D",
        to: "Community Health Center",
        distance: 22,
        time: 50
    },
    {
        from: "Village D",
        to: "District Hospital",
        distance: 30,
        time: 75
    }
];

// API: Get all healthcare facilities
app.get("/api/facilities", (req, res) => {
    res.json(facilities);
});

// API: Get all routes
app.get("/api/routes", (req, res) => {
    res.json(routes);
});

// Test route
app.get("/", (req, res) => {
    res.send("Rural Healthcare Backend is running!");
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server running on port ${PORT}`);
});