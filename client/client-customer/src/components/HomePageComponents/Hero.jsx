import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/result');
  };

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
                            placeholder="Cari..."
                            onClick={handleClick}
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
    </>
  );
};

export default Hero;
