import React from 'react';

const MapComponent = ({ latitude, longitude }) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x300&key=AIzaSyDu_Jhr7MqgdmLyisTYZceA-jja88IAqr0`;
  // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${longitude},${latitude}&zoom=14&size=400x300&key=AIzaSyDu_Jhr7MqgdmLyisTYZceA-jja88IAqr0`;

  return (
    <div>
      <img src={mapUrl} alt="Map" />
    </div>
  );
};

export default MapComponent;
