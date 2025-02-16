import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import SeatUI from "./components/SeatUI";
import AdminPanel from "./components/AdminPanel";
import BookingForm from "./components/BookingForm";

function App() {
  const [selectedBus, setSelectedBus] = useState("5098"); // Default bus
  const [selectedSeat, setSelectedSeat] = useState(null);

  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/">Home</Link> | <Link to="/admin">Admin Panel</Link>
      </nav>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              {/* Bus Selection */}
              <div style={styles.busSelection}>
                <label style={styles.label}>Select Bus: </label>
                <select
                  onChange={(e) => setSelectedBus(e.target.value)}
                  value={selectedBus}
                  style={styles.select}
                >
                  <option value="5098">Bus 5098</option>
                  <option value="5099">Bus 5099</option>
                </select>
              </div>

              {/* Seat Selection */}
              <SeatUI busNumber={selectedBus} setSelectedSeat={setSelectedSeat} />
            </>
          }
        />
        {/* Booking Page */}
        <Route path="/booking" element={<BookingForm busNumber={selectedBus} selectedSeat={selectedSeat} />} />
        {/* Admin Page */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

// 🔹 Styling
const styles = {
  nav: {
    padding: "10px",
    fontSize: "18px",
  },
  busSelection: {
    textAlign: "center",
    margin: "20px",
    fontSize: "18px",
  },
  label: {
    fontWeight: "bold",
    marginRight: "10px",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "5px",
  },
};

export default App;



