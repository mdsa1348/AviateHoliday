import React, { useState, useEffect } from "react";
import axios from "axios";
import "./import.css";

const Import = () => {
  const [countries, setCountries] = useState([]);
  const [newCountryName, setNewCountryName] = useState("");
  const [editCountryId, setEditCountryId] = useState(null);
  const [editCountryName, setEditCountryName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchImages(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/countries");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchImages = async (countryName) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/countries/${countryName}/images`);
      const imageUrls = response.data.map(imageName => ({
        id: imageName,
        url: imageName
      }));
      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleAddCountry = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/countries", { name: newCountryName });
      const { id } = response.data;
      await uploadImage(id);
      setNewCountryName("");
      fetchCountries();
      alert(`Country ${newCountryName} added successfully.`);
    } catch (error) {
      console.error("Error adding country:", error);
      alert("Failed to add country.");
    }
  };

  const handleEditCountry = async () => {
    try {
      await axios.put(`http://localhost:3001/api/countries/${editCountryId}`, { name: editCountryName });
      await uploadImage(editCountryId);
      setEditCountryId(null);
      setEditCountryName("");
      fetchCountries();
      alert(`Country updated successfully.`);
    } catch (error) {
      console.error("Error updating country:", error);
      alert("Failed to update country.");
    }
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      await axios.delete(`http://localhost:3001/api/countries/${countryId}`);
      deleteImage(countryId);
      fetchCountries();
      alert(`Country deleted successfully.`);
    } catch (error) {
      console.error("Error deleting country:", error);
      alert("Failed to delete country.");
    }
  };

  const startEditingCountry = (countryId, countryName) => {
    setEditCountryId(countryId);
    setEditCountryName(countryName);
  };

  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
    setImages([]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const uploadImage = async () => {
    if (!selectedImage || !selectedCountry) return;

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      await axios.post(`http://localhost:3001/api/countries/${selectedCountry}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Image uploaded successfully.");
      fetchImages(selectedCountry);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  const deleteImage = async (countryName, imageName) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the image "${imageName}" for the country "${countryName}"?`);

    if (!isConfirmed) {
      return;
    }

    const encodedImageName = encodeURIComponent(imageName);

    try {
      await axios.delete(`http://localhost:3001/api/countries/images/delete?countryName=${countryName}&imageName=${encodedImageName}`);
      console.log('Image deleted successfully');
      fetchImages(countryName);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image.');
    }
  };

  const handleImageUploadButtonClick = async () => {
    if (!selectedCountry) {
      alert("Please select a country first.");
      return;
    }

    console.log("Selected Country:", selectedCountry);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await axios.post(
        `http://localhost:3001/api/countries/${selectedCountry}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Image uploaded successfully.");
      fetchImages(selectedCountry);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div className="container">
      <h1>Import Page</h1>

      <div className="row">
        <div className="col-4">
          <div>
            <label>Add New Country:</label>
            <input
              type="text"
              value={newCountryName}
              onChange={(e) => setNewCountryName(e.target.value)}
            />
            <button onClick={handleAddCountry}>Add Country</button>
          </div>

          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Country Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country) => (
                  <tr key={country.id}>
                    <td>
                      {editCountryId === country.id ? (
                        <input
                          type="text"
                          value={editCountryName}
                          onChange={(e) => setEditCountryName(e.target.value)}
                        />
                      ) : (
                        country.name
                      )}
                    </td>
                    <td>
                      {editCountryId === country.id ? (
                        <button onClick={handleEditCountry}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => startEditingCountry(country.id, country.name)}>Edit</button>
                          <button onClick={() => handleDeleteCountry(country.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-8">
          <div>
            <label>Select Country:</label>
            <select value={selectedCountry} onChange={handleCountrySelect}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <div>
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <button onClick={handleImageUploadButtonClick}>Upload Image</button>
            </div>
          )}

          {images.length > 0 && (
            <div>
              <h3>Images for {selectedCountry}:</h3>
              <div className="image-list">
                {images.map((image) => (
                  <div key={image.id} className="image-item">
                    <img 
                      src={`http://localhost:3001/images/${selectedCountry}/${image.url}`} 
                      alt={`Image for ${selectedCountry}`} 
                      width="300" 
                      height="300" 
                    />
                    <p>{image.url}</p>
                    <button onClick={() => deleteImage(selectedCountry, image.url)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <p>Other content specific to import can go here.</p>
    </div>
  );
};

export default Import;
