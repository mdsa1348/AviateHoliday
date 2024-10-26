import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UserTourDetailsPage.css';


const UserTourDetailsPage = () => {
  const location = useLocation();
  const { detail } = location.state || {};
  const detailId = detail.id;

  const [Inclusionss, setInclusionss] = useState([]);

  const navigate = useNavigate();
  const [Inclusions, setInclusions] = useState([]);
  const [Exclusions, setExclusions] = useState([]);

  const [description, setDescription] = useState('');
  const [itinerary, setItinerary] = useState([{ day: '', description: '' }]);
  const [images, setImages] = useState(Array(5).fill(null));
  const [imageFiles, setImageFiles] = useState(Array(5).fill(null)); // To store the files


  const [formData, setFormData] = useState({
    //inclusion:Inclusionss,
    date:'',
    ADULT: '1',
    CHILD: '0',
    INF: '0',
  });


  var count = 1;
  var Excount = 1;

  useEffect(() => {
    fetchTourDetails();
    fetchInclusions();
    fetchExclusions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClicked = (index,e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
    const newImageFiles = [...Inclusionss];
      newImageFiles[index] = e.target.value;
      setInclusionss(newImageFiles);
  };

  const fetchTourDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/package-details/${detailId}`);
      console.log('Fetched Data:', response.data);

      if (response.data) {
        const { description, itinerary, images } = response.data;

        setDescription(description || '');
        setItinerary(itinerary ? JSON.parse(itinerary) : [{ day: '', description: '' }]);
        setImages(images ? JSON.parse(images) : Array(5).fill(null)); // Ensure images are parsed correctly

        if (JSON.parse(images) == null) {
          console.log('image null..............');
        } else {
          console.log('image not null..............');

        }

      } else {
        console.error('No data found');
      }
    } catch (error) {
      console.error('Error fetching tour details', error);
    }
  };

  const fetchInclusions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/Inclusions");
      setInclusions(response.data);
      //console.log('Fetched Data:', response.data);

    } catch (error) {
      console.error("Error fetching Inclusions:", error);
    }
  };

  const fetchExclusions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/exclusions");
      setExclusions(response.data);
      //console.log('Fetched Data:', response.data);

    } catch (error) {
      console.error("Error fetching Exclusions:", error);
    }
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

    // Print form data for debugging
    console.log('Form Data:', formData);

    if (!formData.date || !formData.ADULT || !formData.CHILD || !formData.INF) {
      alert(`Please fill out all fields`);
      return;
    } else {
      navigate(`/BookingInfo`, { state: { detail, formData } });
    }
  };

  return (
    <div className="tour-details-container">
      <h1 className="detailstitle">{detail.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="images">
          {Array.isArray(images) && images.map((image, index) => (
            <div key={index} className={`image-placeholder ${index === 2 ? 'large' : `small${index + 1}`}`}>
              {image ? (

                <img src={`http://localhost:3001/packageImage/${image}`} alt={image} className="uploaded-image" />


              ) : (
                <div>
                  <label className="image-upload-label">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="tour-details-grid">
          <div>
            <h3>Inclusions</h3>

            <table className="inextable">

              {/* <thead>
                <tr>
                  <th>ID</th>
                  <th>Inclusions</th>
                  <th>Actions</th>
                </tr>
              </thead> */}
              <tbody>
                {Inclusions.map((Inclusion) => (

                  <tr key={Inclusion.ID}>
                    <td>
                      <input type="checkbox" name="inclusion" onClick={(e) => handleClicked(Inclusion.ID, e)} value={Inclusion.Inclusion} />
                      {Inclusion.Inclusion}

                    </td>
                    <td>

                      {/* {Inclusion.Inclusion} */}

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Exclusions</h3>

            <table className="inextable">
              {/* <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Exclusions</th>
                                    
                                </tr>
                            </thead> */}
              <tbody>
                {Exclusions.map((Exclusion) => (

                  <tr key={Exclusion.id}>
                    <td>
                      <input type="checkbox" value={Exclusion.exclusion} />
                      {Exclusion.exclusion}
                    </td>
                    <td>
                      {/* {
                                                Exclusion.exclusion
                                            } */}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="details-section">
          <h2>Description</h2>
          <textarea
            value={description}
          // onChange={(e) => setDescription(e.target.value)}

          />

          <h2>Itinerary</h2>
          {itinerary.map((day, index) => (
            <div key={index}>
              <h3>Day {index + 1}</h3>

              <textarea
                placeholder="Description"
                value={day.description}
              // onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
              />
              {/* <button onClick={() => deleteItineraryDay(index)}>Delete Day</button> */}
            </div>
          ))}
          {/* <button type="button" onClick={addItineraryDay}>Add Day</button> */}
        </div>

          <div className="formInput">

            <input style={{ height: '5vh' ,marginRight:'20px' }} className='DateInputss' type="date" name="date" value={formData.date} onChange={handleChange} />
            ADULT
            <input style={{ height: '5vh', width: '4vw' }} className='formInputss' type="number" min={'1'} name="ADULT"  value={formData.ADULT} onChange={handleChange} />
            CHILD
            <input style={{ height: '5vh', width: '4vw' }} className='formInputss' min={'0'} type="number" name="CHILD" value={formData.CHILD} onChange={handleChange} />
            INFANTS
            <input style={{ height: '5vh', width: '4vw' }}  value={formData.INF} onChange={handleChange} className='formInputss' min={'0'} type="number" name="INF" />

          </div>

          <button className="formsubmit" type="submit">Confirm Booking</button>

      </form>
    </div>
  );
};

export default UserTourDetailsPage;
