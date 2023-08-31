import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';

const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          setError(error);
        }
      );
    } else {
      setError(new Error('Geolocation is not supported by this browser.'));
    }
  }, []);

  if (error) {
    // Handle error if geolocation is not supported or user denies permission
    return <div>Error: {error.message}</div>;
  }

  if (latitude && longitude) {
    // Use the latitude and longitude values
    console.log(latitude, longitude)
    return (
      <div>
        <h1>Location</h1>
        <h2>latitude</h2>
        <h2>longitude</h2>
        <MapComponent latitude={latitude} longitude={longitude} />
      </div>
    );
  }

  // Loading state while waiting for location data
  return <div>Loading...</div>;
};

export default LocationComponent;
