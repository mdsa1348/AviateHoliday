import React from 'react';
import { useLocation } from 'react-router-dom';

function OtherPage() {
  const location = useLocation();
  const { selectedCountry } = location.state || {};

  return (
    <div  style={{ marginTop: '10vh', marginBottom: '10vh'}}>
      <h1>Other Page</h1>
      {selectedCountry && <p>Selected Country: {selectedCountry}</p>}
    </div>
  );
}

export default OtherPage;
