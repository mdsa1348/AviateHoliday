import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddDetailsPage.css';

const AddDetailsPage = () => {
  const navigate = useNavigate();
  const [inclusions, setInclusions] = useState([{ value: '' }]);
  const [exclusions, setExclusions] = useState([{ value: '' }]);
  const [terms, setTerms] = useState([{ value: '' }]);
  const [cancellationPolicy, setCancellationPolicy] = useState([{ value: '' }]);
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    fetchTourDetails();
  }, []);

  const fetchTourDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tour-details');
      console.log('Fetched Data:', response.data); // Debugging line
      const { inclusions, exclusions, terms, cancellation_policy } = response.data[0] || {};

      setInclusions(parseJSON(inclusions));
      setExclusions(parseJSON(exclusions));
      setTerms(parseJSON(terms));
      setCancellationPolicy(parseJSON(cancellation_policy));

      setTourDetails(response.data[0]);
    } catch (error) {
      console.error('Error fetching tour details', error);
    }
  };

  const parseJSON = (data) => {
    if (!data) return [{ value: '' }];
    try {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        return parsedData.map(item => ({ value: item.value || '' }));
      }
      return [{ value: '' }];
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [{ value: '' }];
    }
  };

  const handleChange = (setter, index, value) => {
    setter(prevState => {
      const newState = [...prevState];
      newState[index].value = value;
      return newState;
    });
  };

  const handleAddField = (setter) => {
    setter(prev => [...prev, { value: '' }]);
  };

  const handleRemoveField = (setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://localhost:3001/api/tour-details', {
        inclusions: JSON.stringify(inclusions),
        exclusions: JSON.stringify(exclusions),
        terms: JSON.stringify(terms),
        cancellation_policy: JSON.stringify(cancellationPolicy),
      });

      if (response.status === 200) {
        await fetchTourDetails();
        navigate('/tour-details', {
          state: {
            inclusions,
            exclusions,
            terms,
            cancellationPolicy,
          },
        });
      }
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  return (
    <div className="add-details-container">
      <h1>Add Tour Details</h1>

      <section className="details-section">
        <h2>Inclusions</h2>
        {inclusions.map((item, index) => (
          <div key={index} className="detail-item">
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleChange(setInclusions, index, e.target.value)}
              placeholder={`Inclusion ${index + 1}`}
            />
            <button onClick={() => handleRemoveField(setInclusions, index)}>Remove</button>
          </div>
        ))}
        <button onClick={() => handleAddField(setInclusions)}>Add Inclusion</button>
      </section>

      <section className="details-section">
        <h2>Exclusions</h2>
        {exclusions.map((item, index) => (
          <div key={index} className="detail-item">
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleChange(setExclusions, index, e.target.value)}
              placeholder={`Exclusion ${index + 1}`}
            />
            <button onClick={() => handleRemoveField(setExclusions, index)}>Remove</button>
          </div>
        ))}
        <button onClick={() => handleAddField(setExclusions)}>Add Exclusion</button>
      </section>

      <section className="details-section">
        <h2>Terms and Conditions</h2>
        {terms.map((item, index) => (
          <div key={index} className="detail-item">
            <textarea
              value={item.value}
              onChange={(e) => handleChange(setTerms, index, e.target.value)}
              placeholder={`Term ${index + 1}`}
            />
            <button onClick={() => handleRemoveField(setTerms, index)}>Remove</button>
          </div>
        ))}
        <button onClick={() => handleAddField(setTerms)}>Add Term</button>
      </section>

      <section className="details-section">
        <h2>Cancellation Policy</h2>
        {cancellationPolicy.map((item, index) => (
          <div key={index} className="detail-item">
            <textarea
              value={item.value}
              onChange={(e) => handleChange(setCancellationPolicy, index, e.target.value)}
              placeholder={`Policy ${index + 1}`}
            />
            <button onClick={() => handleRemoveField(setCancellationPolicy, index)}>Remove</button>
          </div>
        ))}
        <button onClick={() => handleAddField(setCancellationPolicy)}>Add Policy</button>
      </section>

      <button onClick={handleSubmit}>Submit</button>

      <hr />

      <div>
        <h2>Fetched Tour Details</h2>
        <ul>
          {tourDetails && (
            <li>
              <strong>Inclusions:</strong> {inclusions.map((item, index) => (
                <span key={index}>{item.value}{index < inclusions.length - 1 ? ', ' : ''}</span>
              ))}<br />
              <strong>Exclusions:</strong> {exclusions.map((item, index) => (
                <span key={index}>{item.value}{index < exclusions.length - 1 ? ', ' : ''}</span>
              ))}<br />
              <strong>Terms:</strong> {terms.map((item, index) => (
                <span key={index}>{item.value}{index < terms.length - 1 ? ', ' : ''}</span>
              ))}<br />
              <strong>Cancellation Policy:</strong> {cancellationPolicy.map((item, index) => (
                <span key={index}>{item.value}{index < cancellationPolicy.length - 1 ? ', ' : ''}</span>
              ))}<br />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddDetailsPage;
