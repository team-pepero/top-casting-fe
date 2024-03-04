import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <div style={{ width: '800px', margin: 'auto' }}>
      <Slider {...settings}>
        {images.map((image, idx) => (
          <div key={idx}>
            <img src={image} alt={`Slide ${idx}`} style={{ width: '50%', height: '50%' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
