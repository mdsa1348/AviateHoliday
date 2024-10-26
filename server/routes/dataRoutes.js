const express = require('express');
const router = express.Router();
const connection = require('../config');

// In your Express router file
router.get('/users-email/:email', async (req, res) => {
  const userEmail = req.params.email;

  try {
    const [rows] = await connection.query('SELECT Id FROM users WHERE Email = ?', [userEmail]);

    if (rows.length > 0) {
      res.status(200).json({ userId: rows[0].Id });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).json({
      message: 'Failed to fetch user ID',
      error: {
        message: error.message,
        code: error.code,
        errno: error.errno,
        sql: error.sql,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage
      }
    });
  }
});


// Define route handler to retrieve data by userId
const getDataByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [results] = await connection.query('SELECT * FROM contact_form WHERE userId = ?', [userId]);
    res.json(results);
  } catch (err) {
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define route handler to insert data
const insertData = async (req, res) => {
  const { userId } = req.params;
  const { name, email, message } = req.body;
  try {
    const [results] = await connection.query(
      'INSERT INTO contact_form (Name, Email, Message, userId) VALUES (?, ?, ?, ?)',
      [name, email, message, userId]
    );
    console.log('Data inserted successfully:', results);
    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error('Error inserting data into MySQL:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Define route handler to update data
const updateData = async (req, res) => {
  const { id } = req.params;
  const { Name, Email, Message } = req.body;

  console.log("req.body :  ", req.body); // This should show the expected fields

  try {
    const [results] = await connection.query(
      'UPDATE contact_form SET Name = ?, Email = ?, Message = ? WHERE Id = ?',
      [Name, Email, Message, id]
    );
    console.log('Data updated successfully:', results);
    res.json({ message: 'Data updated successfully' });
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Define route handler to delete data
const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.query('DELETE FROM contact_form WHERE Id = ?', [id]);
    res.json({ message: 'Data deleted successfully' });
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define route handler to retrieve all data
const getAllData = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM contact_form');
    res.json(results);
  } catch (err) {
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define routes
router.get('/datas', getAllData);
router.get('/datas/:userId', getDataByUserId);
router.post('/datas/:userId', insertData);
router.put('/datas/:id', updateData);
router.delete('/datas/:id', deleteData);


module.exports = router;
