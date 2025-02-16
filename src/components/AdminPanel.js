import React, { useState, useEffect } from "react";
import SeatUI from "./SeatUI";

const AdminPanel = () => {
  const [selectedBus, setSelectedBus] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatDetails, setSeatDetails] = useState(null);

  useEffect(() => {
    if (selectedBus) {
      const bookedSeats = JSON.parse(localStorage.getItem(`bus_${selectedBus}`)) || [];
      setSeatDetails({ bookedSeats });
    }
  }, [selectedBus]);


  const handleSeatClick = (seat) => {
    if (!seat || seat === "🚍") return;

    const bookedSeats = JSON.parse(localStorage.getItem(`bus_${selectedBus}`)) || [];

    if (bookedSeats.includes(seat)) {
      setSeatDetails({
        busNumber: selectedBus,
        seatNumber: seat,
        booked: true,
      });
    } else {
      setSeatDetails({
        busNumber: selectedBus,
        seatNumber: seat,
        booked: false,
      });
    }

    setSelectedSeat(seat);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Panel</h1>

    
      <label>Select Bus: </label>
      <select onChange={(e) => setSelectedBus(e.target.value)} style={styles.select}>
        <option value="">Select Bus</option>
        <option value="5098">5098</option>
        <option value="5099">5099</option>
      </select>

      
      {selectedBus && <SeatUI busNumber={selectedBus} onSeatClick={handleSeatClick} />}

      
      {selectedSeat && (
        <div style={styles.bookingDetails}>
          <h3>Seat Details</h3>
          <p><strong>Bus No:</strong> {seatDetails.busNumber}</p>
          <p><strong>Seat No:</strong> {seatDetails.seatNumber}</p>
          <p>
            <strong>Status:</strong>{" "}
            {seatDetails.booked ? (
              <span style={{ color: "red", fontWeight: "bold" }}>Booked</span>
            ) : (
              <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
  },
  heading: {
    marginBottom: "10px",
  },
  select: {
    padding: "8px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  bookingDetails: {
    marginTop: "60px",  
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    width: "350px",
    margin: "auto",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
  },

};

export default AdminPanel;


