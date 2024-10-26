const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const connection = require("../config");


// GET /api/countries - Fetch all countries
router.get("/Inclusions", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM inclusions");
    res.json(results);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// POST /api/countries - Add a new country
router.post("/Inclusions", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    const [result] = await connection.query("INSERT INTO inclusions (Inclusion) VALUES (?)", [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ error: "Failed to add country" });
  }
});

// PUT /api/countries/:id - Update a country
router.put("/Inclusions/:id", async (req, res) => {
  const countryId = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    await connection.query("UPDATE inclusions SET Inclusion = ? WHERE ID = ?", [name, countryId]);
    res.json({ id: countryId, name });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Failed to update country" });
  }
});

// DELETE /api/countries/:id - Delete a country
router.delete("/Inclusions/:id", async (req, res) => {
  const countryId = req.params.id;
  try {
    await connection.query("DELETE FROM inclusions WHERE ID = ?", [countryId]);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Failed to delete country" });
  }
});


// Exclusions

// GET /api/countries - Fetch all countries
router.get("/exclusions", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM exclusions");
    res.json(results);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// POST /api/countries - Add a new country
router.post("/exclusions", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    const [result] = await connection.query("INSERT INTO exclusions (exclusion) VALUES (?)", [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ error: "Failed to add country" });
  }
});

// PUT /api/countries/:id - Update a country
router.put("/exclusions/:id", async (req, res) => {
  const countryId = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Country name is required" });
    return;
  }

  try {
    await connection.query("UPDATE exclusions SET exclusion = ? WHERE id = ?", [name, countryId]);
    res.json({ id: countryId, name });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Failed to update country" });
  }
});

// DELETE /api/countries/:id - Delete a country
router.delete("/exclusions/:id", async (req, res) => {
  const countryId = req.params.id;
  try {
    await connection.query("DELETE FROM exclusions WHERE id = ?", [countryId]);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Failed to delete country" });
  }
});


module.exports = router;
