const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connection = require('../config'); // Ensure this import is correct

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../countrydetails'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Fetch country details
router.get('/:country/details', async (req, res) => {
  const { country } = req.params;
  try {
    const [results] = await connection.query('SELECT * FROM countryDetails WHERE country = ?', [country]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching country details:', err);
    res.status(500).json({ error: 'Error fetching country details' });
  }
});

// Add new country details
router.post('/:country/details', upload.single('image'), async (req, res) => {
  const { country } = req.params;
  const { title, description, price } = req.body;
  const image = req.file.filename;

  const query = 'INSERT INTO countryDetails (country, title, description, price, image) VALUES (?, ?, ?, ?, ?)';
  try {
    await connection.query(query, [country, title, description, price, image]);
    res.status(201).json({ message: 'Country details added successfully' });
  } catch (err) {
    console.error('Error adding country details:', err);
    res.status(500).json({ error: 'Error adding country details' });
  }
});

// Edit country details
router.put('/:country/details/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  let image = req.body.image; // default to current image if no new image is provided

  if (req.file) {
    image = req.file.filename;

    try {
      // Fetch the old image filename
      const [results] = await connection.query('SELECT image FROM countryDetails WHERE id = ?', [id]);
      const oldImage = results[0].image;

      // Delete the old image file
      fs.unlink(path.join(__dirname, '../countrydetails', oldImage), (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        }
      });
    } catch (err) {
      console.error('Error fetching old image:', err);
      res.status(500).json({ error: 'Error fetching old image' });
      return;
    }
  }

  const query = 'UPDATE countryDetails SET title = ?, description = ?, price = ?, image = ? WHERE id = ?';
  try {
    await connection.query(query, [title, description, price, image, id]);
    res.status(200).json({ message: 'Country details updated successfully' });
  } catch (err) {
    console.error('Error updating country details:', err);
    res.status(500).json({ error: 'Error updating country details' });
  }
});

// Delete country details
router.delete('/:country/details/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM countryDetails WHERE id = ?';
  try {
    await connection.query(query, [id]);
    res.status(200).json({ message: 'Country details deleted successfully' });
  } catch (err) {
    console.error('Error deleting country details:', err);
    res.status(500).json({ error: 'Error deleting country details' });
  }
});

module.exports = router;
