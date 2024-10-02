import React from 'react'
import './HomePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CardMainContent from '../product/card/CardMainContent';
import { Link } from 'react-router-dom';
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
        <div className="container mt-5 featured-content">
          <h2 >
            <span></span>Featured Categories</h2>
          <div className="row">

            <div className="col-md-3">
              <div className="featured-card">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg" className="card-img-top" alt="Arduino Board" />
                <div className="card-body text-center">
                  <Link to='/product' className="featured-card-title">Arduino Board</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="featured-card">
                <img src="https://ozrobotics.com/wp-content/uploads/2023/01/Robot-STEM-Kit.jpg" className="card-img-top" alt="STEM Robotics Kit" />
                <div className="card-body text-center">
                  <Link to='/product' className="featured-card-title">STEM Robotics Kit</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="featured-card">
                <img src="https://ohstem.vn/wp-content/uploads/2022/03/kit-hoc-lap-trinh-AIoT-1.jpg" className="card-img-top" alt="AI & IoT" />
                <div className="card-body text-center">
                  <Link to='/product' className="featured-card-title">AI & IoT</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="featured-card">
                <img src="https://vn.element14.com/productimages/large/en_GB/4255998-40.jpg" className="card-img-top" alt="Raspberry Pi" />
                <div className="card-body text-center">
                  <Link to='/product' className="featured-card-title">Raspberry Pi</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}