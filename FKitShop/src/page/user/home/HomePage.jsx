import React from 'react'
// import '../../../util/GlobalStyle/GlobalStyle.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CardMainContent from '../product/card/CardMainContent';

export default function HomePage() {
  return (
    <div>
      <div className="wrapper ">
        <Carousel fade>
          <Carousel.Item className='banner-container'>
            <img
              className="d-block w-100 banner-img"
              src="\img\banner2.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item className='banner-container'>
            <img
              className="d-block w-100 banner-img"
              src="\img\banner1.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item className='banner-container'>
            <img
              className="d-block w-100 banner-img"
              src="\img\banner3.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        <CardMainContent/>

      </div>
    </div>
  )
}