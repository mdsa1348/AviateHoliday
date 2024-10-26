import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCountryDetails.css';
import { useNavigate } from 'react-router-dom';


const AddCountryDetails = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ title: '', description: '', price: '', image: null });
  const [countryDetails, setCountryDetails] = useState([]);
  const [editingDetail, setEditingDetail] = useState(null);
  const selectedCountry = localStorage.getItem('selectedCountry') || 'Bangladesh';

  useEffect(() => {
    fetchCountryDetails();
  }, [selectedCountry]);

  const fetchCountryDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/${selectedCountry}/details`);
      setCountryDetails(response.data);
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleImageChange = (e) => {
    setDetails({ ...details, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', details.title);
    formData.append('description', details.description);
    formData.append('price', details.price);
    formData.append('image', details.image);

    try {
      if (editingDetail) {
        await axios.put(`http://localhost:3001/api/${selectedCountry}/details/${editingDetail.id}`, formData);
        setEditingDetail(null);
      } else {
        await axios.post(`http://localhost:3001/api/${selectedCountry}/details`, formData);
      }
      fetchCountryDetails();
      setDetails({ title: '', description: '', price: '', image: null });
    } catch (error) {
      console.error('Error adding/updating details:', error);
    }
  };

  const handleEdit = (detail) => {
    setDetails({
      title: detail.title,
      description: detail.description,
      price: detail.price,
      image: detail.image,
    });
    setEditingDetail(detail);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/${selectedCountry}/details/${id}`);
      fetchCountryDetails();
    } catch (error) {
      console.error('Error deleting details:', error);
    }
  };

  const handleDetails = (detail) => {
    navigate(`/tourdetailspage/${detail.id}`, { state: { detail } });
  };

  return (
    <div className='Countrydetails'>
      <h2>{editingDetail ? `Edit Details for ${selectedCountry}` : `Add Details for ${selectedCountry}`}</h2>
      <form onSubmit={handleSubmit} className="details-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={details.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={details.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={details.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
        />
        <button type="submit">{editingDetail ? 'Update Details' : 'Add Details'}</button>
      </form>

      <h2>Details for {selectedCountry}</h2>
      <div className="country-details">
        {countryDetails.map((detail, index) => (
          <div key={index} className="detail-card">
            <img src={`http://localhost:3001/countrydetails/${detail.image}`} alt={detail.title} />
            <h3>{detail.title}</h3>
            <p>{detail.description}</p>
            <p>Price: BDT {detail.price}</p><br></br>
            <button onClick={() => handleDetails(detail)}>Details</button>

            <button onClick={() => handleEdit(detail)}>Edit</button>
            <button onClick={() => handleDelete(detail.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCountryDetails;
