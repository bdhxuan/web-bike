import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Banner1 from "../../../images/banner1.jpg";
import Banner2 from "../../../images/banner2.jpg";
import Banner3 from "../../../images/banner3.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';


const Banner = () => {
    return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={Banner1} alt="First slide"/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Banner2} alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Banner3} alt="Third slide"/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;