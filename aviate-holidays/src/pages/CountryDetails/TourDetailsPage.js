import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './TourDetailsPage.css';

const TourDetailsPage = () => {
  const location = useLocation();
  const { detail } = location.state || {};
  const detailId = detail.id;

  const navigate = useNavigate();
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [id, setid] = useState('');
  const [description, setDescription] = useState('');
  const [itinerary, setItinerary] = useState([{ day: '', description: '' }]);
  const [images, setImages] = useState(Array(5).fill(null));
  const [imageFiles, setImageFiles] = useState(Array(5).fill(null)); // To store the files

  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchTourDetails();
    fetchTourExtras();
  }, []);

 const fetchTourDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/package-details/${detailId}`);
    console.log('Fetched Data:', response.data);

    if (response.data) {
      const {id, description, itinerary, images } = response.data;
      setid(id || '');
      setDescription(description || '');
      setItinerary(itinerary ? JSON.parse(itinerary) : [{ day: '', description: '' }]);
      setImages(images ? JSON.parse(images) : Array(5).fill(null)); // Ensure images are parsed correctly

      // Store existing images
      setExistingImages(images ? JSON.parse(images) : Array(5).fill(null));

      if(images == null){
        console.log('image null..............');
      }else{
        console.log('image not null..............');
      }
    } else {
      console.error('No data found');
    }
  } catch (error) {
    console.error('Error fetching tour details', error);
  }
};

  const fetchTourExtras = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tour-details');
      console.log('Fetched Data:', response.data); // Debugging line
      const { inclusions, exclusions, terms, cancellation_policy } = response.data[0] || {};

      setInclusions(parseJSON(inclusions));
      setExclusions(parseJSON(exclusions));

      console.log('Fetched Data:', inclusions); // Debugging line
      console.log('Fetched Data:', exclusions); // Debugging line

    } catch (error) {
      console.error('Error fetching tour extras', error);
    }
  };

  const parseJSON = (jsonString) => {
    try {
      return JSON.parse(jsonString).map(item => ({ ...item, checked: false }));
    } catch (error) {
      console.error('Error parsing JSON', error);
      return [];
    }
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, { day: '', description: '' }]);
  };

  const deleteItineraryDay = (index) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary);
  };
const handleImageChange = (index, event) => {
  const file = event.target.files[0];
  if (file) {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles);
      
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImages = [...images];
      newImages[index] = e.target.result;
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  }
};

  

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('description', description);
  formData.append('itinerary', JSON.stringify(itinerary));
  formData.append('detailId', detailId);

  // Populate the images array with either the new file or null for unchanged images
  images.forEach((image, index) => {
    if (imageFiles[index]) {
      formData.append(`images[${index}]`, imageFiles[index]);
    } else {
      formData.append(`images[${index}]`, null);
    }
  });



  const postformData = new FormData();
  postformData.append('description', description);
  postformData.append('itinerary', JSON.stringify(itinerary));
  postformData.append('detailId', detailId);
  imageFiles.forEach((file, index) => {
      if (file) {
        postformData.append('images[]', file);
          console.log("its here file");
      }else{
        postformData.append('images[]', null);
        console.log("its here no file");

      }
  });



  // Log formData for debugging
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    // If detailId exists, use PUT to update
    const response = id 
      ? await axios.put(`http://localhost:3001/api/package-details/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      : await axios.post('http://localhost:3001/api/package-details', postformData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

    // Handle successful response
    console.log(response.data);
  } catch (error) {
    console.error('Error submitting tour details', error);
  }
};

  
  

  return (
    <div className="tour-details-container">
      <h1 className="detailstitle">{detail.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="images">


        {Array.isArray(images) && images.map((image, index) => (
  <div key={index} className={`image-placeholder ${index === 2 ? 'large' : `small${index + 1}`}`}>
    <div className='imagediv'>
      {image ? (
        <img 
          src={image.startsWith('data:') ? image : `http://localhost:3001/packageImage/${image}`} 
          alt={`Image ${index}`} 
          className="uploaded-image" 
        />
      ) : (
        <div className="placeholder">No Image</div>
      )}
      
      <label className="image-upload-label">
        {image ? "Update Image" : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(index, e)}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  </div>
))}


        </div>

        <div className="details-section">
          <h2>Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h2>Itinerary</h2>
          {itinerary.map((day, index) => (
            <div key={index}>
              <h3>Day {index + 1}</h3>
              
              <textarea
                placeholder="Description"
                value={day.description}
                onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
              />
              <button onClick={() => deleteItineraryDay(index)}>Delete Day</button>
            </div>
          ))}
          <button type="button" onClick={addItineraryDay}>Add Day</button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TourDetailsPage;
