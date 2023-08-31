import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../assets/css/swiper.min.css';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import MapComponent from "../MapComponent.jsx";

const CustomPrevArrow = ({ onClick }) => (
  <button type="button" className="custom-prev-arrow btn btn-link" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button type="button" className="custom-next-arrow btn btn-link" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
);

const ImageSlider = ({ relation }) => {
  const parkingSpaceImages = relation?.ParkingSpaceImages || [];

  const handlePrevArrowClick = () => {
    sliderRef.slickPrev();
  };

  const handleNextArrowClick = () => {
    sliderRef.slickNext();
  };

  let sliderRef;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => {
      if (sliderRef) {
        sliderRef.slickGoTo(next);
      }
    }
  };

  // Render loading state if parkingSpaceImages are not yet available
  if (parkingSpaceImages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="image-slider-container">
        <Slider ref={slider => (sliderRef = slider)} {...settings}>
          {parkingSpaceImages.map(image => (
            <div key={image.id}>
              <div className="image-slide">
                <img src={image.imgUrl} alt="#" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <ArrowCircleLeftSharpIcon
          onClick={handlePrevArrowClick}
          style={{ marginRight: '50px' }}
        />

        <ArrowCircleRightSharpIcon onClick={handleNextArrowClick} />
      </div>
    </div>
  );
};

export default ImageSlider;
