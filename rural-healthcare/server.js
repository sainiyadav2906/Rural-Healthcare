import express from "express";
import cors from "cors";
import { villages, facilities, routes } from "../data.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// ==========================================
// HOME / SERVER STATUS
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Rural Healthcare Routing API is running",
    status: "online"
  });
});


// ==========================================
// GET ALL VILLAGES
// ==========================================

app.get("/api/villages", (req, res) => {
  res.json({
    success: true,
    villages: villages
  });
});


// ==========================================
// GET ALL HEALTHCARE FACILITIES
// ==========================================

app.get("/api/facilities", (req, res) => {
  res.json({
    success: true,
    facilities: facilities
  });
});


// ==========================================
// GET ROUTES FOR A VILLAGE
// ==========================================

app.get("/api/routes/:village", (req, res) => {
  const village = decodeURIComponent(req.params.village);

  if (!routes[village]) {
    return res.status(404).json({
      success: false,
      message: "Village not found"
    });
  }

  res.json({
    success: true,
    village: village,
    routes: routes[village]
  });
});


// ==========================================
// CALCULATE BEST ROUTE
// ==========================================

app.post("/api/calculate-route", (req, res) => {
  const {
    village,
    facility,
    emergency
  } = req.body;

  // Check required fields
  if (!village || !facility) {
    return res.status(400).json({
      success: false,
      message: "Village and healthcare facility are required"
    });
  }

  // Check village
  if (!routes[village]) {
    return res.status(404).json({
      success: false,
      message: "Village not found"
    });
  }

  // Check facility
  if (!routes[village][facility]) {
    return res.status(404).json({
      success: false,
      message: "Route not available"
    });
  }

  // Get route
  const route = routes[village][facility];

  let travelTime = route.time;

  // Emergency priority
  if (emergency === true) {
    travelTime = Math.ceil(route.time * 0.8);
  }

  // Send response
  res.json({
    success: true,
    patientLocation: village,
    healthcareFacility: facility,
    priority: emergency === true ? "Emergency" : "Normal",
    distance: route.distance,
    estimatedTime: travelTime,
    unit: "km",
    timeUnit: "minutes",
    message:
      emergency === true
        ? "Emergency route calculated with priority"
        : "Best route calculated successfully"
  });
});


// ==========================================
// INVALID API ROUTE
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log("======================================");
  console.log("Rural Healthcare Backend Started");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("======================================");
});