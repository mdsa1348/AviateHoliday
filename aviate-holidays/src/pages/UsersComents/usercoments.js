import React, { useEffect, useState } from 'react';
import "./comments.css";

const UserComments = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log('Updating item with Id:');

    try {
      const response = await fetch('http://localhost:3001/api/datas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  const handleEdit = async (id) => {
  
    try {
      const itemToEdit = data.find(item => item.Id === id);
      console.log('Item to edit:', itemToEdit);
  
      const newName = prompt('Enter new name:', itemToEdit.Name);
      const newEmail = prompt('Enter new email:', itemToEdit.Email);
      const newMessage = prompt('Enter new message:', itemToEdit.Message);
    
      if (newName === null || newEmail === null || newMessage === null) {
        console.log('Update canceled');
        return;
      }
    
      const updatedItem = { ...itemToEdit, Name: newName, Email: newEmail, Message: newMessage };
      console.log('Updated item:', updatedItem);
  
      await updateItemInBackend(id, updatedItem);
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error editing item:', error);
      setError('Failed to edit item. Please try again later.');
    }
  };
  
  
  const updateItemInBackend = async (id, updatedItem) => {
    console.log('Updating item with Id:', id);
  
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
  
      const updatedData = data.map(item =>
        item.Id === id ? updatedItem : item
      );
      setData(updatedData);
  
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error.message);
      setError('Failed to update item. Please try again later.');
    }
  };
  
  
  const handleDelete = async (id) => {
    try {
      // Show a confirmation dialog
      const confirmDelete = window.confirm('Are you sure you want to delete this item?');
      if (!confirmDelete) {
        return; // If user cancels, do nothing
      }
  
       // Proceed with deletion if user confirms
       const response = await fetch(`http://localhost:3001/api/datas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      const updatedData = data.filter(item => item.Id !== id);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error.message);
    }
  };
  

  return (
    <div className="container">
      <h1>Data from Backend</h1>
      {error && <p>Error: {error}</p>}
      <div className="card-container">
        {data.map(item => (
          <div key={item.Id} className="card">
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
