import React, { useState, useEffect } from "react";

const BookingForm = ({ busNumber, selectedSeat, setSelectedSeat }) => {
    const [name, setName] = useState("");
    const [destination, setDestination] = useState("MIRPUR 11");
    const [time, setTime] = useState("8:00 AM");
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (selectedSeat) {
            setIsClicked(false); 
        }
    }, [selectedSeat]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedSeat) {
            alert("Please select a seat before booking!");
            return;
        }

        let bookedSeats = JSON.parse(localStorage.getItem(`bus_${busNumber}`)) || [];

        if (bookedSeats.includes(selectedSeat)) {
            alert("Seat already booked!");
            return;
        }

        bookedSeats.push(selectedSeat);
        localStorage.setItem(`bus_${busNumber}`, JSON.stringify(bookedSeats));

      
        setIsClicked(true);

        // Show confirmation message
        alert(`✅ Seat ${selectedSeat} booked successfully for ${name} to ${destination} at ${time}`);

        // Clear form after booking
        setName("");
        setSelectedSeat(null);
    };

    return (
        <div style={styles.container}>
            <div style={styles.heading}>SEAT BOOKING FORM</div>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Name Input */}
                <div style={styles.row}>
                    <label style={styles.label}>NAME:</label>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                {/* Bus Number */}
                <div style={styles.row}>
                    <label style={styles.label}>BUS NO:</label>
                    <span style={styles.staticText}>{busNumber}</span> 
                </div>

                {/* Seat Number */}
                <div style={styles.row}>
                    <label style={styles.label}>SEAT NO:</label>
                    <span style={styles.staticText}>{selectedSeat || "Not Selected"}</span> 
                </div>

                {/* Destination Dropdown */}
                <div style={styles.row}>
                    <label style={styles.label}>SELECT DESTINATION:</label>
                    <select value={destination} onChange={(e) => setDestination(e.target.value)} style={styles.select}>
                        <option value="MIRPUR 11">MIRPUR 11</option>
                        <option value="DHANMONDI">DHANMONDI</option>
                        <option value="GULSHAN">GULSHAN</option>
                        <option value="UTTARA">UTTARA</option>
                    </select>
                </div>

                {/* Time Dropdown */}
                <div style={styles.row}>
                    <label style={styles.label}>SELECT TIME:</label>
                    <select value={time} onChange={(e) => setTime(e.target.value)} style={styles.select}>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        ...styles.button,
                        backgroundColor: isClicked ? "green" : "white",
                        color: isClicked ? "white" : "black",
                    }}
                >
                    BOOK SEAT
                </button>
            </form>
        </div>
    );
};


const styles = {
    container: {
        textAlign: "center",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        width: "500px",
        margin: "auto",
        border: "2px solid black",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    },
    heading: {
        color: "black",
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "white",
        border: "2px solid black",
        padding: "10px",
        borderRadius: "5px",
        textAlign: "center",
        display: "inline-block",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        width: "100%",
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        padding: "5px 0",
    },
    label: {
        fontWeight: "bold",
        width: "40%",
        textAlign: "left",
    },
    input: {
        width: "55%",
        padding: "10px",
        borderRadius: "5px",
        border: "2px solid black",
        fontSize: "16px",
        textAlign: "center",
    },
    staticText: {
        fontWeight: "bold",
        fontSize: "16px",
    },
    select: {
        width: "55%",
        padding: "10px",
        borderRadius: "5px",
        border: "2px solid black",
        fontSize: "16px",
        backgroundColor: "white",
    },
    button: {
        padding: "10px",
        border: "2px solid black",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        width: "45%",
        transition: "background-color 0.3s ease",
        textTransform: "uppercase",
    },
};

export default BookingForm;

