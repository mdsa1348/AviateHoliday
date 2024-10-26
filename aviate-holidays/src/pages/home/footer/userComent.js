import React, { useEffect, useState } from 'react';
import "./usercoments.css";

const UserComments = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userId = 1; // Example: current user id is 2
    try {
      const response = await fetch(`http://localhost:3001/api/datas/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log("jsonData: ",jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  const handleEdit = (id) => {
    // Find the item to edit based on its ID
    const itemToEdit = data.find(item => item.Id === id);
    
    // Prompt the user to edit the data
    const newName = prompt('Enter new name:', itemToEdit.Name);
    const newEmail = prompt('Enter new email:', itemToEdit.Email);
    const newMessage = prompt('Enter new message:', itemToEdit.Message);
    
    // If user cancels the prompt, exit without editing
    if (newName === null || newEmail === null || newMessage === null) {
      return;
    }
  
    // Construct updatedItem object
    const updatedItem = { ...itemToEdit, Name: newName, Email: newEmail, Message: newMessage };
    
    console.log('update item',updatedItem);
    // Call updateItemInBackend with ID and updatedItem
    updateItemInBackend(id, updatedItem);
  };
  
  
  const updateItemInBackend = async (id, updatedItem) => {
    try {
      const response = await fetch(`http://localhost:3001/api/datas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
  
      // Update the data state after successful update
      const updatedData = data.map(item =>
        item.usersId === id ? updatedItem : item
      );
      setData(updatedData);
      fetchData();
    } catch (error) {
      console.error('Error updating item:', error.message);
      setError('Failed to update item. Please try again later.');
    }
  };
  
  
  

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
    try {
      const response = await fetch(`http://localhost:3001/api/datas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      // Update the data state after successful deletion
      const updatedData = data.filter(item => item.usersId !== id);
      setData(updatedData);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error.message);
    }
  }
  };

  return (
    <div className="container">
      <h1>Data from Backend</h1>
      {error && <p>Error: {error}</p>}
      <div className="card-container">
        {data.map(item => (
          <div key={item.usersId} className="card">
            <div className="card-details">
              <div><strong>UserID:</strong> {item.userId}</div>
              <div><strong>Name:</strong> {item.Name}</div>
              <div><strong>Email:</strong> {item.Email}</div>
              <div><strong>Message:</strong> {item.Message}</div>
            </div>
            <div className="card-actions">
              <button className="edit-button" onClick={() => handleEdit(item.Id)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(item.Id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComments;
