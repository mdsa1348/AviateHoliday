const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../config');
const fs = require('fs'); // Ensure this import is correct
const multer = require('multer');



// Endpoint to fetch tour details by detailId
// Endpoint to fetch tour details

router.get("/tour-details", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM tour_details where cancellation_policy='no'");
    res.json(results);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// POST /api/countries - Add a new country
router.post("/tour-details", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    const [result] = await connection.query("INSERT INTO tour_details (terms) VALUES (?)", [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ error: "Failed to add country" });
  }
});


// PUT /api/countries/:id - Update a country
router.put("/tour-details/:id", async (req, res) => {
  const countryId = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    await connection.query("UPDATE tour_details SET terms = ? WHERE id = ?", [name, countryId]);
    res.json({ id: countryId, name });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Failed to update country" });
  }
});

// DELETE /api/countries/:id - Delete a country
router.delete("/tour-details/:id", async (req, res) => {
  const countryId = req.params.id;
  try {
    await connection.query("DELETE FROM tour_details WHERE id = ?", [countryId]);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Failed to delete country" });
  }
});

//policy..

// Endpoint to fetch tour details by detailId
// Endpoint to fetch tour details

router.get("/CPs", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM tour_details where terms='none'");
    res.json(results);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// POST /api/countries - Add a new country
router.post("/CPs", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    const [result] = await connection.query("INSERT INTO tour_details (cancellation_policy) VALUES (?)", [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ error: "Failed to add country" });
  }
});


// PUT /api/countries/:id - Update a country
router.put("/CPs/:id", async (req, res) => {
  const countryId = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    await connection.query("UPDATE tour_details SET cancellation_policy = ? WHERE id = ?", [name, countryId]);
    res.json({ id: countryId, name });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Failed to update country" });
  }
});

// DELETE /api/countries/:id - Delete a country
router.delete("/CPs/:id", async (req, res) => {
  const countryId = req.params.id;
  try {
    await connection.query("DELETE FROM tour_details WHERE id = ?", [countryId]);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Failed to delete country" });
  }
});







// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../packageImage');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

const generateFields = (numFields) => {
  const fields = [];
  for (let i = 0; i < numFields; i++) {
    fields.push({ name: `images[${i}]`, maxCount: 1 });
  }
  return fields;
};

const cpUpload = upload.fields(generateFields(5));

// // POST: Create new package details
// router.post('/package-details', upload.array('images[]'), async (req, res) => {
//   try {
//       const { description, itinerary, detailId } = req.body;

//       // Parse JSON data (if necessary)
//       const parsedItinerary = itinerary ? JSON.parse(itinerary) : [];
//       const uploadedImages = req.files ? req.files.map((file) => file.filename) : [];

//       // Insert a new record
//       const insertQuery = `
//           INSERT INTO package_details (detail_id, description, itinerary, images)
//           VALUES (?, ?, ?, ?)
//       `;
//       await connection.query(insertQuery, [detailId, description, JSON.stringify(parsedItinerary), JSON.stringify(uploadedImages)]);
//       res.status(201).json({ message: 'Package details saved successfully' });
//   } catch (error) {
//       console.error('Error processing data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });


// Endpoint to handle tour details and image upload
router.post('/package-details', upload.array('images[]'), async (req, res) => {
  try {
    const { description, itinerary, detailId } = req.body;

    // Log the received body and files for debugging
    console.log('Request Body:', req.body);
    console.log('Uploaded Files:', req.files);

    // Parse JSON data (if necessary)
    const parsedItinerary = itinerary ? JSON.parse(itinerary) : [];

    // Extract uploaded image filenames
    const uploadedImages = req.files ? req.files.map((file) => file.filename) : [];

    // Log uploaded images for debugging
    console.log('Uploaded Images:', uploadedImages);

    // Prepare the SQL query to insert the new record
    const insertQuery = `
      INSERT INTO package_details (detail_id, description, itinerary, images)
      VALUES (?, ?, ?, ?)
    `;

    // Execute the query to insert the data
    await connection.query(insertQuery, [
      detailId,
      description,
      JSON.stringify(parsedItinerary),
      JSON.stringify(uploadedImages)
    ]);

    // Respond with a success message
    res.status(201).json({ message: 'Package details saved successfully' });
  } catch (error) {
    // Log the error and respond with a failure message
    console.error('Error processing data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.put('/package-details/:detailId', cpUpload, async (req, res) => {
  try {
    const { description, itinerary } = req.body;
    const detailId = req.params.detailId;

    // Fetch existing images from the database
    const [existingData] = await connection.query('SELECT images FROM package_details WHERE id = ?', [detailId]);
    const existingImages = existingData[0].images ? JSON.parse(existingData[0].images) : [];

    // Parse JSON data (if necessary)
    const parsedItinerary = itinerary ? JSON.parse(itinerary) : [];
    const uploadedFiles = req.files || {};

    // Log existing images and uploaded files
    console.log('Existing Images:', existingImages);
    console.log('Uploaded Files:', uploadedFiles);

    // Create an updated images array by preserving nulls and replacing files at specific indices
    const updatedImages = existingImages.map((img, index) => {
      const file = uploadedFiles[`images[${index}]`] ? uploadedFiles[`images[${index}]`][0].filename : null;
      return file ? file : img;
    });

    // Log updated images
    console.log('Updated Images:', updatedImages);

    // Update the database with the new description, itinerary, and updated images
    await connection.query(
      'UPDATE package_details SET description = ?, itinerary = ?, images = ? WHERE id = ?',
      [description, JSON.stringify(parsedItinerary), JSON.stringify(updatedImages), detailId]
    );

    res.status(200).json({ message: 'Package details updated successfully' });
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







router.get('/package-details/:detailId', async (req, res) => {
  const { detailId } = req.params;

  const query = `SELECT * FROM package_details WHERE detail_id = ?`;

  try {
    const [results] = await connection.query(query, [detailId]);
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).send('No data found');
    }
  } catch (err) {
    console.error('Error fetching package details:', err);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
