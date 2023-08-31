import React, {useEffect, useState} from 'react';
import MapComponent from "../MapComponent.jsx";

const AddLocation = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
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
      <div className="listing-title">
        <h4>Add Location</h4>
        <p>Peta ini merupakan lokasi anda berada, disarankan untuk mendaftarkan saat berada di lahan parkir</p>

        <MapComponent latitude={latitude} longitude={longitude} />

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Alamat Lengkap</label>
              <input type="text" className="form-control add-listing_form" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Provinsi</label>
              <input type="text" className="form-control add-listing_form" value={country} onChange={e => setCountry(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Kota</label>
              <input type="text" className="form-control add-listing_form" value={zipCode} onChange={e => setZipCode(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="listing-title">
      <h4>Add Location</h4>
      <p>Peta ini merupakan lokasi anda berada, disarankan untuk mendaftarkan saat berada di lahan parkir</p>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Alamat Lengkap</label>
            <input type="text" className="form-control add-listing_form" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Provinsi</label>
            <input type="text" className="form-control add-listing_form" value={country} onChange={e => setCountry(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Kota</label>
            <input type="text" className="form-control add-listing_form" value={zipCode} onChange={e => setZipCode(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLocation;
