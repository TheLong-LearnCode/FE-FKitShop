import React from 'react'
import '../HomePage/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function HomePage() {
  return (
    <div>
      <div className="wrapper ">
        <Carousel fade>
          <Carousel.Item className='banner-container'>
            <img
              className="d-block w-100 banner-img"
              src="\img\banner1.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item className='banner-container'>
            <img
              className="d-block w-100 banner-img"
              src="\img\banner2.png"
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


      </div>
    </div>
  )
}
