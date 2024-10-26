import React from "react";
import "./logoutConfirmation.css"; // Create and style this CSS file as needed
import { useNavigate } from "react-router-dom";

const LogoutConfirmation = ({ onCancel }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user info from local storage
        localStorage.removeItem('AviateHolidaysUserInfo');
        
        // Add your logout logic here
        console.log("Logged out");

        // Navigate to the auth page
        navigate('/auth');
        window.location.reload();
        // Call the onCancel callback to close the confirmation dialog
        onCancel();
    };

    return (
        <div className="logout-confirmation">
            <div className="logout-card">
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to logout?</p>
                <button onClick={handleLogout}>Ok</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default LogoutConfirmation;
