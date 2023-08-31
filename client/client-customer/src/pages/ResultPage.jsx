import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParkingSpaces } from '../store/actions';
import {Link} from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ResultPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const parkingSpaces = useSelector((state) => state.data.data);
  console.log(parkingSpaces)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParkingSpaces());
  }, [dispatch]);

  const filteredSpaces = parkingSpaces.filter((space) => {
    const { name, subtitle, description, city } = space;
    const query = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(query) ||
      subtitle.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query) ||
      city.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <section className="hero-wrap d-flex align-items-center">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="hero-title">
              <h1>Parkir sini yuk!</h1>
              <h3>Temukan tempat parkir yang sesuai dengan kebutuhanmu di lebih dari 431 lokasi</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="search-box">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="search-box2">
                        <div className="search-box-title">
                          <label>Cari nama kota atau keterangan lain sesuai kebutuhan</label><br />
                          <input
                            type="text"
                            name="#"
                            className="search-form"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-search">
                  <a href="#" className="btn btn-simple">Search →</a>
                </div>
              </form>
              <p className="search-bottom-title">Allow permission untuk lokasi ya bila diperlukan!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="main-block featured-wrap">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="titile-block">
                <h2>Hasil Pencarian</h2>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              {filteredSpaces.map((parkingSpace) => (
                <div className="col-md-6 col-lg-3 article-first" key={parkingSpace.id}>
                  {/*<div className="news-block">*/}
                  {/*  <img*/}
                  {/*    src={parkingSpace.mainImg}*/}
                  {/*    alt={parkingSpace.name}*/}
                  {/*    className="img-fluid"*/}
                  {/*    style={{*/}
                  {/*      width: '100%',*/}
                  {/*      height: '250px',*/}
                  {/*      objectFit: 'cover',*/}
                  {/*    }}*/}
                  {/*  />*/}
                  {/*  <div className="news-title">*/}
                  {/*    <h5>{parkingSpace.name}</h5>*/}
                  {/*    <p className="blog2-thumbnail-name">{parkingSpace.subtitle}</p>*/}
                  {/*    <hr />*/}
                  {/*    <p className="blog2-thumbnail-name">{parkingSpace.description}</p>*/}
                  {/*    <p className="blog2-thumbnail-name"><LocationOnIcon /><span> {parkingSpace.city}</span></p>*/}
                  {/*    <Link to={`/detail/${parkingSpace.id}`}className="btn-primary">Lihat*/}
                  {/*    </Link>*/}
                  {/*  </div>*/}
                  {/*</div>*/}

                  <div className="news-block">
                    <img
                      src={parkingSpace.mainImg}
                      alt={parkingSpace.name}
                      className="img-fluid"
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="news-title">
                      <h5>{parkingSpace.name}</h5>
                      <p className="blog2-thumbnail-name ellipsis">{parkingSpace.subtitle}</p>
                      <hr />
                      <p className="blog2-thumbnail-name ellipsis">{parkingSpace.description}</p>
                      <p className="blog2-thumbnail-name"><LocationOnIcon /><span> {parkingSpace.city}</span></p>
                      <Link to={`/detail/${parkingSpace.id}`} className="btn-primary">Lihat
                      </Link>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResultPage;
