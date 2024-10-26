const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const connection = require("../config");

// Delete image
router.delete("/countries/images/delete", (req, res) => {
    const { countryName, imageName } = req.query; // Using query parameters instead of route parameters

    console.log('countryName: ', countryName, 'imageName', imageName);

    if (!countryName || !imageName) {
        return res.status(400).json({ error: "Country name and image name are required" });
    }

    const imagePath = path.join(__dirname, '..', `images/${countryName}/${imageName}`);
    console.log('Constructed image path:', imagePath);

    // Check if the file exists before attempting to delete
    if (fs.existsSync(imagePath)) {
        // Perform deletion
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
                res.status(500).json({ error: "Failed to delete image" });
            } else {
                console.log("Image deleted successfully");
                res.json({ message: "Image deleted successfully" });
            }
        });
    } else {
        res.status(404).json({ error: "Image not found.." });
    }
});

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const countryName = req.params.countryName;
    const dir = path.join(__dirname, "..", "images", countryName);
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
  limits: { fileSize: 1024 * 1024 * 8 }, // 8 MB file size limit
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// GET /api/countries - Fetch all countries
router.get("/countries", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM countries");
    res.json(results);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// POST /api/countries - Add a new country
router.post("/countries", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    const [result] = await connection.query("INSERT INTO countries (name) VALUES (?)", [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ error: "Failed to add country" });
  }
});

// PUT /api/countries/:id - Update a country
router.put("/countries/:id", async (req, res) => {
  const countryId = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    await connection.query("UPDATE countries SET name = ? WHERE id = ?", [name, countryId]);
    res.json({ id: countryId, name });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Failed to update country" });
  }
});

// DELETE /api/countries/:id - Delete a country
router.delete("/countries/:id", async (req, res) => {
  const countryId = req.params.id;
  try {
    await connection.query("DELETE FROM countries WHERE id = ?", [countryId]);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Failed to delete country" });
  }
});

// POST /api/countries/:countryName/upload - Upload image for a country
router.post("/countries/:countryName/upload", upload.single("image"), (req, res) => {
  res.json({ message: "Image uploaded successfully" });
});

// GET /api/countries/:countryName/images - Fetch images for a country
router.get("/countries/:countryName/images", (req, res) => {
  const countryName = req.params.countryName;
  const dir = path.join(__dirname, "..", "images", countryName);

  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).json({ error: "Failed to fetch images" });
      return;
    }

    // Filter only image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif";
    });

    res.json(imageFiles);
  });
});

module.exports = router;
