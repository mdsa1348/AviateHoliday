import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingsPage.css'; // Import the CSS file for styling

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:3001/api/bookings/${id}`);
        setBookings(bookings.filter(booking => booking.id !== id));
      } catch (error) {
        setError(error);
      }
    }
  };


  const handlePay = async (id) => {
    // Implement the pay functionality here
    try {
      // Assuming the API has an endpoint for processing payment
      await axios.post(`http://localhost:3001/api/bookings/${id}/pay`);
      // Update the booking status if needed
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching bookings: {error.message}</div>;

  return (
    <div className="bookings-container">
      <h2 className="title">All Bookings</h2>
      <div className="bookings-tabs">
      {bookings.map((booking, index) => (
        <div key={index} className="booking-item">
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Package Name:</strong> {booking.packageName}</p>
          <p><strong>Package Details:</strong> {booking.packageDetails}</p>
          <p><strong>Date of Travel:</strong> {booking.dateOfTravel}</p>
          <p><strong>No of Travelers:</strong> {booking.noOfTravelers}</p>
          <p><strong>User Email:</strong> {booking.userEmail}</p>
          <p><strong>Payment Status:</strong> {booking.payment}</p>
          <div className="booking-actions">
            <button onClick={() => handleDelete(booking.id)} className="action-button delete-button">Delete</button>
            <button onClick={() => handlePay(booking.id)} className="action-button pay-button">Pay</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BookingsPage;
