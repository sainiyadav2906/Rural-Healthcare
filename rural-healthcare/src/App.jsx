import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [facilities, setFacilities] = useState([]);
  const [routes, setRoutes] = useState([]);

  // Ambulance data
  const [ambulances] = useState([
    {
      id: "AMB-001",
      driver: "Available Driver",
      phone: "9876543210",
      location: "Village A",
      status: "Available",
    },
    {
      id: "AMB-002",
      driver: "Available Driver",
      phone: "9876543211",
      location: "Village B",
      status: "Available",
    },
  ]);

  // Medicine data
  const [medicines] = useState([
    {
      name: "Paracetamol",
      facility: "Primary Health Center",
      quantity: 50,
      status: "Available",
    },
    {
      name: "ORS",
      facility: "Community Health Center",
      quantity: 30,
      status: "Available",
    },
    {
      name: "Amoxicillin",
      facility: "District Hospital",
      quantity: 20,
      status: "Available",
    },
  ]);

  const [selectedVillage, setSelectedVillage] = useState("Village A");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Backend Data
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilitiesResponse = await fetch(
          "http://localhost:5000/api/facilities"
        );

        const routesResponse = await fetch(
          "http://localhost:5000/api/routes"
        );

        if (!facilitiesResponse.ok || !routesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const facilitiesData = await facilitiesResponse.json();
        const routesData = await routesResponse.json();

        setFacilities(facilitiesData);
        setRoutes(routesData);

        if (facilitiesData.length > 0) {
          setSelectedFacility(facilitiesData[0].name);
        }
      } catch (err) {
        console.error(err);
        setError("Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // Get Villages
  // =========================

  const villages = [...new Set(routes.map((route) => route.from))];

  // =========================
  // Find Route
  // =========================

  const findRoute = () => {
    const route = routes.find(
      (item) =>
        item.from === selectedVillage &&
        item.to === selectedFacility
    );

    setSelectedRoute(route || null);
  };

  // =========================
  // Loading Screen
  // =========================

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="loader"></div>
          <h2>Loading Healthcare Data...</h2>
          <p>Connecting to the server</p>
        </div>
      </div>
    );
  }

  // =========================
  // Error Screen
  // =========================

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-card">
          <h2>⚠️ Connection Error</h2>

          <p>{error}</p>

          <p>
            Make sure the backend is running on
            <strong> http://localhost:5000</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">

      {/* =========================
          Header
      ========================= */}

      <header className="header">

        <div className="header-content">

          <div className="logo">
            🏥
          </div>

          <div>
            <h1>Rural Healthcare</h1>
            <p>Smart Routing System</p>
          </div>

        </div>

        <div className="server-status">
          <span className="status-dot"></span>
          Server Connected
        </div>

      </header>

      {/* =========================
          Main Content
      ========================= */}

      <main className="container">

        {/* =========================
            Hero
        ========================= */}

        <section className="hero">

          <div>
            <h2>Find the Best Healthcare Route</h2>

            <p>
              Quickly find the nearest healthcare facility and
              estimated travel time from your village.
            </p>
          </div>

          <div className="hero-icon">
            🚑
          </div>

        </section>


        {/* =========================
            Ambulance Services
        ========================= */}

        <section className="services-section">

          <div className="section-title">

            <div>
              <h2>🚑 Ambulance Services</h2>

              <p>
                Available ambulances near your area
              </p>
            </div>

            <span className="facility-count">
              {
                ambulances.filter(
                  (ambulance) =>
                    ambulance.status === "Available"
                ).length
              }{" "}
              Available
            </span>

          </div>


          <div className="service-grid">

            {ambulances.map((ambulance) => (

              <div
                className="service-card"
                key={ambulance.id}
              >

                <div className="service-icon">
                  🚑
                </div>

                <div className="service-content">

                  <h3>{ambulance.id}</h3>

                  <span className="available-status">
                    ● {ambulance.status}
                  </span>

                  <div className="service-info">

                    <p>
                      <strong>Driver:</strong>{" "}
                      {ambulance.driver}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {ambulance.location}
                    </p>

                    <p>
                      <strong>Contact:</strong>{" "}
                      {ambulance.phone}
                    </p>

                  </div>

                  <button
                    className="service-button"
                    onClick={() =>
                      alert(
                        `Ambulance ${ambulance.id} requested!`
                      )
                    }
                  >
                    🚑 Request Ambulance
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =========================
            Medicine Availability
        ========================= */}

        <section className="services-section">

          <div className="section-title">

            <div>
              <h2>💊 Medicine Availability</h2>

              <p>
                Check available medicines at healthcare facilities
              </p>
            </div>

            <span className="facility-count">
              {medicines.length} Medicines
            </span>

          </div>


          <div className="medicine-grid">

            {medicines.map((medicine, index) => (

              <div
                className="medicine-card"
                key={index}
              >

                <div className="medicine-icon">
                  💊
                </div>

                <div className="medicine-content">

                  <h3>{medicine.name}</h3>

                  <span className="available-status">
                    ● {medicine.status}
                  </span>

                  <div className="medicine-info">

                    <p>
                      <strong>Facility:</strong>{" "}
                      {medicine.facility}
                    </p>

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {medicine.quantity} units
                    </p>

                  </div>

                  <button
                    className="medicine-button"
                    onClick={() =>
                      alert(
                        `${medicine.name} is available at ${medicine.facility}`
                      )
                    }
                  >
                    💊 Find Medicine
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =========================
            Route Selection
        ========================= */}

        <section className="selection-card">

          <h2>📍 Select Your Route</h2>

          <div className="selection-grid">

            {/* Village */}

            <div className="input-group">

              <label>
                Select Village
              </label>

              <select
                value={selectedVillage}
                onChange={(e) => {
                  setSelectedVillage(e.target.value);
                  setSelectedRoute(null);
                }}
              >

                {villages.map((village, index) => (

                  <option
                    key={index}
                    value={village}
                  >
                    {village}
                  </option>

                ))}

              </select>

            </div>


            {/* Healthcare Facility */}

            <div className="input-group">

              <label>
                Select Healthcare Facility
              </label>

              <select
                value={selectedFacility}
                onChange={(e) => {
                  setSelectedFacility(e.target.value);
                  setSelectedRoute(null);
                }}
              >

                {facilities.map((facility, index) => (

                  <option
                    key={index}
                    value={facility.name}
                  >
                    {facility.name}
                  </option>

                ))}

              </select>

            </div>

          </div>


          <button
            className="route-button"
            onClick={findRoute}
          >
            🚗 Find Best Route
          </button>

        </section>


        {/* =========================
            Route Result
        ========================= */}

        {selectedRoute && (

          <section className="result-card">

            <div className="result-header">

              <div>

                <span className="result-label">
                  Recommended Route
                </span>

                <h2>
                  {selectedRoute.from} →{" "}
                  {selectedRoute.to}
                </h2>

              </div>

              <div className="check-icon">
                ✓
              </div>

            </div>


            <div className="result-details">

              <div className="detail-box">

                <span className="detail-icon">
                  📍
                </span>

                <div>

                  <span>
                    Distance
                  </span>

                  <strong>
                    {selectedRoute.distance} km
                  </strong>

                </div>

              </div>


              <div className="detail-box">

                <span className="detail-icon">
                  ⏱️
                </span>

                <div>

                  <span>
                    Travel Time
                  </span>

                  <strong>
                    {selectedRoute.time} minutes
                  </strong>

                </div>

              </div>

            </div>

          </section>

        )}


        {/* =========================
            Healthcare Facilities
        ========================= */}

        <section className="facilities-section">

          <div className="section-title">

            <div>

              <h2>
                🏥 Healthcare Facilities
              </h2>

              <p>
                Available healthcare centers
              </p>

            </div>

            <span className="facility-count">
              {facilities.length} Facilities
            </span>

          </div>


          <div className="facility-grid">

            {facilities.map((facility, index) => (

              <div
                className="facility-card"
                key={index}
              >

                <div className="facility-icon">

                  {facility.type === "Hospital"
                    ? "🏨"
                    : "🏥"}

                </div>


                <div className="facility-content">

                  <h3>
                    {facility.name}
                  </h3>

                  <span className="facility-type">
                    {facility.type}
                  </span>


                  <div className="facility-info">

                    <div>

                      <span>
                        Distance
                      </span>

                      <strong>
                        {facility.distance} km
                      </strong>

                    </div>


                    <div>

                      <span>
                        Travel Time
                      </span>

                      <strong>
                        {facility.time} min
                      </strong>

                    </div>

                  </div>


                  <button
                    className="select-button"
                    onClick={() => {

                      setSelectedFacility(
                        facility.name
                      );

                      setSelectedRoute(null);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                    }}
                  >
                    Select Facility
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =========================
            Available Routes
        ========================= */}

        <section className="routes-section">

          <div className="section-title">

            <div>

              <h2>
                🛣️ Available Routes
              </h2>

              <p>
                Routes retrieved from the backend
              </p>

            </div>

          </div>


          <div className="route-list">

            {routes.map((route, index) => (

              <div
                className="route-item"
                key={index}
              >

                <div className="route-number">
                  {index + 1}
                </div>


                <div className="route-path">

                  <strong>
                    {route.from}
                  </strong>

                  <span>
                    →
                  </span>

                  <strong>
                    {route.to}
                  </strong>

                </div>


                <div className="route-stats">

                  <span>
                    📍 {route.distance} km
                  </span>

                  <span>
                    ⏱️ {route.time} min
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>


      {/* =========================
          Footer
      ========================= */}

      <footer>

        <p>
          Rural Healthcare Routing System
        </p>

        <span>
          Powered by React + Express
        </span>

      </footer>

    </div>
  );
}

export default App;