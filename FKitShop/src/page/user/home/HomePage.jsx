import React from 'react'
import './HomePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CardMainContent from '../product/card/CardMainContent';

export default function HomePage() {
  return (
    <div>
      <div className="wrapper ">
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active banner-container">
              <img src="\img\banner2.png" className="d-block w-100 banner-img" alt="Firstslide" />
            </div>
            <div className="carousel-item banner-container">
              <img src="\img\banner1.png" className="d-block w-100 banner-img" alt="Secondslide" />
            </div>
            <div className="carousel-item banner-container">
              <img src="\img\banner3.png" className="d-block w-100 banner-img" alt="Thirdslide" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-target="#carouselExampleFade" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>

          </button>
          <button className="carousel-control-next" type="button" data-target="#carouselExampleFade" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>

          </button>
        </div>

        <CardMainContent />

        <div className="container mt-4">
          <div className="row">
            <div className='col-md-6 small-banner'>
              <img src="https://www.shutterstock.com/image-vector/stem-science-technology-engineering-mathematics-600nw-1732140442.jpg" alt="smal-banner-1" />
            </div>
            <div className='col-md-6 small-banner'>
              <img src="\img\banner-scaled-1.jpg" alt="small-banner-2" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
