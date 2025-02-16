import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SeatUI = ({ busNumber, onSeatClick, setSelectedSeat }) => {
  const navigate = useNavigate();

  const seatLayout = [
    ["", "", "🚍"],   // Driver at the top right
    ["A1", "", "A2", "A3"],
    ["B1", "", "B2", "B3"],
    ["C1", "", "C2", "C3"],
    ["D1", "", "D2", "D3"],
    ["E1", "", "E2", "E3"],
  ];

  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const savedSeats = JSON.parse(localStorage.getItem(`bus_${busNumber}`)) || [];
    setBookedSeats(savedSeats);
  }, [busNumber]);

  const handleSeatClick = (seat) => {
    if (!seat || seat === "🚍") return; // Ignore empty spaces and driver

    if (bookedSeats.includes(seat)) {
      if (onSeatClick) {
        onSeatClick(seat); // Admin Panel functionality
      } else {
        alert(`Seat ${seat} is already booked!`);
      }
      return;
    }

    if (setSelectedSeat) {
      setSelectedSeat(seat); // For booking form
      navigate("/booking"); // Redirect to booking page
    } else if (onSeatClick) {
      onSeatClick(seat); // For Admin panel
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Bus No: {busNumber}</h2>

      {/* Seat Grid */}
      <div style={styles.grid}>
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map((seat, seatIndex) => (
              <div key={seatIndex} style={styles.seatContainer}>
                {seat === "🚍" ? (
                  <div style={styles.driver}>🚍 Driver</div>
                ) : seat ? (
                  <button
                    onClick={() => handleSeatClick(seat)}
                    style={{
                      ...styles.seat,
                      backgroundColor: bookedSeats.includes(seat) ? "grey" : "white",
                    }}
                  >
                    {seat}
                  </button>
                ) : (
                  <div style={styles.emptySpace}></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "20px" },
  heading: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px" },
  driver: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#444",
    color: "white",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  grid: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  row: { display: "flex", gap: "10px", justifyContent: "center" },
  seatContainer: { width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" },
  seat: { padding: "10px", border: "1px solid black", cursor: "pointer", fontSize: "16px", borderRadius: "5px", width: "50px", height: "50px" },
  emptySpace: { width: "50px", height: "50px" },
};

export default SeatUI;

