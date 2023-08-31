import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addParkingSpaces } from '../store/actions/index.js';
import MapComponent from '../components/MapComponent.jsx';
import SwalTimer from "../components/SwalTimer.jsx";

const facilitiesData = [
  {
    "id": 1,
    "name": "Tenaga Keamanan 24 jam",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 2,
    "name": "Wifi gratis",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 3,
    "name": "Atap Tertutup",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 4,
    "name": "Atap Terbuka",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 5,
    "name": "No Smoking",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 6,
    "name": "Lantai semen atau lebih baik",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 7,
    "name": "Lantai tanah",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 8,
    "name": "Menjual minuman/makanan",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 9,
    "name": "Rantai penghalang per 1 mobil",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 10,
    "name": "Terdapat pagar dan gerbang",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 11,
    "name": "Jasa tambahan cuci mobil",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  },
  {
    "id": 12,
    "name": "Lokasi bebas banjir",
    "createdAt": "2023-07-03T10:21:53.875Z",
    "updatedAt": "2023-07-03T10:21:53.875Z"
  }
]

const AddListingPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false); //1


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setFormData((prevFormData) => ({
            ...prevFormData,
            mapLat: position.coords.latitude.toString(),
            mapLong: position.coords.longitude.toString(),
          }));
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      setError(new Error('Geolocation is not supported by this browser.'));
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    description: '',
    city: '',
    stock: '',
    mapLong: '',
    mapLat: '',
    price: '',
    images: [],
    facilities: []
  });

  if (latitude && longitude) {
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      const parsedValue = name === "price" || name === "stock" ? parseInt(value) : value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parsedValue,
      }));
    };

    const handleBackButtonClick = () => {
      navigate('/dashboard-landlord');
    };

    // const handlePhotoChange = (event) => {
    //   const files = Array.from(event.target.files);
    //   const images = files.map((file) => file.name);
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     images,
    //     mainImg: images[0],
    //   }));
    // };

    const handlePhotoChange = (event) => {
      const files = Array.from(event.target.files);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: files,
      }));
    };

    const handleFacilityChange = (event) => {
      const { value, checked } = event.target;
      const facilityId = parseInt(value); // Convert the value to an integer

      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          facilities: [...prevFormData.facilities, facilityId],
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          facilities: prevFormData.facilities.filter((facilityId) => facilityId !== facilityId),
        }));
      }
    };


    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('---> formData AddListingPage', formData);
      dispatch(
        addParkingSpaces(
          formData.name,
          formData.subtitle,
          formData.description,
          formData.city,
          formData.stock,
          formData.mapLat,
          formData.mapLong,
          formData.price,
          formData.images,
          formData.facilities
        )
      );
      setFormData({
        name: '',
        subtitle: '',
        description: '',
        city: '',
        stock: '',
        mapLong: '',
        mapLat: '',
        price: '',
        images: [],
        facilities: []
      });

      setTimeout(() => {
        navigate('/dashboard-landlord');
      }, 1000);
      setIsSubmitted(true); //2
    };

    return (
      <>
        <section className="main-block">
          {isSubmitted && <SwalTimer msg={'Sudah Menambah Lahan Parkir Baru'}/>} //3
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <button
                  className="btn btn-primary"
                  onClick={handleBackButtonClick}
                  style={{marginBottom: '20px'}}
                >
                  ← Kembali
                </button>


                <div className="listing-wrap">
                  <form onSubmit={handleSubmit}>
                    <div className="listing-title">
                      <h4>Informasi Lahan Parkir</h4>
                      <p>Data lahan parkir yang akan disewakan</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nama Tempat Parkir</label>
                            <input
                              type="text"
                              className="form-control add-listing_form"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Penjelasan Singkat</label>
                            <input
                              type="text"
                              className="form-control add-listing_form"
                              name="subtitle"
                              value={formData.subtitle}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Deskripsi Lengkap</label>
                            <textarea
                              className="form-control add-listing_form"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>




                        </div>
                        <div className="col-md-6">
                          <div className="col-md-12">
                            <div className="form-group">
                              <div className="row">
                                <div className="col">
                                  <label>Lahan Tersedia</label>
                                  <input
                                    type="text"
                                    className="form-control add-listing_form"
                                    name="stock"
                                    placeholder="Misal: 15"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="col">
                                  <label>Harga</label>
                                  <input
                                    type="text"
                                    className="form-control add-listing_form"
                                    name="price"
                                    placeholder="Harga per 30 hari"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Kota</label>
                            <select
                              className="form-control add-listing_form"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            >
                              <option value="">Pilih Kota</option>
                              <option value="Jakarta">Jakarta</option>
                              <option value="Bekasi">Bekasi</option>
                              <option value="Bandung">Bandung</option>
                              <option value="Surabaya">Surabaya</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Gambar</label>
                            <input
                              type="file"
                              className="form-control add-listing_form"
                              name="images"
                              multiple
                              accept="image/*"
                              onChange={handlePhotoChange}
                            />
                          </div>


                          {/*<div className="form-group">*/}
                          {/*  <label>Main Image</label>*/}
                          {/*  <input*/}
                          {/*    type="text"*/}
                          {/*    className="form-control add-listing_form"*/}
                          {/*    name="mainImg"*/}
                          {/*    value={formData.mainImg}*/}
                          {/*    onChange={handleInputChange}*/}
                          {/*  />*/}
                          {/*</div>*/}


                        </div>
                      </div>
                      <hr />
                      <div className="form-group">
                        <label style={{fontSize: '20px', color: 'black', fontWeight: 'bold', textDecoration: 'underline'}}>Fasilitas Lahan Parkir</label>



                        <div className="row justify-content-start">
                          <div className="col-md-4">
                            {facilitiesData.slice(0, 4).map((facility) => (
                              <div className="form-check text-start d-flex flex-column" key={facility.id}>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="facilities"
                                  value={facility.id}
                                  checked={formData.facilities.includes(facility.id)}
                                  onChange={handleFacilityChange}
                                />
                                <label className="form-check-label text-start">{facility.name}</label>
                              </div>
                            ))}
                          </div>
                          <div className="col-md-4">
                            {facilitiesData.slice(4, 8).map((facility) => (
                              <div className="form-check text-start d-flex flex-column" key={facility.id}>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="facilities"
                                  value={facility.id}
                                  checked={formData.facilities.includes(facility.id)}
                                  onChange={handleFacilityChange}
                                />
                                <label className="form-check-label text-start">{facility.name}</label>
                              </div>
                            ))}
                          </div>
                          <div className="col-md-4">
                            {facilitiesData.slice(8).map((facility) => (
                              <div className="form-check text-start d-flex flex-column" key={facility.id}>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="facilities"
                                  value={facility.id}
                                  checked={formData.facilities.includes(facility.id)}
                                  onChange={handleFacilityChange}
                                />
                                <label className="form-check-label text-start">{facility.name}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>


                      <MapComponent latitude={latitude} longitude={longitude} />


                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="btn-wrap btn-wrap2">
                          <button type="submit" className="btn btn-simple">
                            KIRIM DATA
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default AddListingPage;
