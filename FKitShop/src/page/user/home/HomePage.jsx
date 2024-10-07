
import React, { useState, useEffect } from 'react'

import './HomePage.css'
import { useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import CardContent from '../product/card/CardContent';
import { GET } from '../../../constants/httpMethod';
import api from '../../../config/axios';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';

export default function HomePage() {
  const data = useSelector(state => state.auth);
  const statusData = useSelector(state => state.auth.data);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleLogin = () => {
    setShow(false); // Close the modal
    navigate('/login'); // Navigate to the login page
  }
  const handleRegister = () => {
    setShow(false);
    navigate('/register'); // Navigate to the register pageavigate('/register'); // Navigate to the register page
  }

  const [products, setProducts] = useState([]); // Trạng thái để lưu danh sách sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái để theo dõi quá trình tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái để lưu lỗi nếu có

    const [activeButton, setActiveButton] = useState('new');

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api[GET]("product/products");
                setProducts(response.data.data); // Lưu dữ liệu vào trạng thái

            } catch (err) {
                setError(err); // Lưu lỗi nếu có
            } finally {
                setLoading(false); // Đặt loading thành false sau khi hoàn thành
            }
        };

        fetchProducts(); // Gọi hàm để lấy dữ liệu
    }, []); // Chạy một lần khi component được mount

    if (loading) return <div>Loading...</div>; // Hiển thị loading khi đang tải
    if (error) return <div>Error: {error.message}</div>; // Hiển thị lỗi nếu có

  //trường hợp chưa login
  useEffect(() => {
    if (statusData === null || statusData === undefined) {
      const timer = setTimeout(() => {
        setShow(true); // Show the modal after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }
  }, [statusData]);

  console.log('data in homepage: ', data); //-passed:gòm status:success, data.accounts->userdata và error:null
  //empty: status: idle, data: token, error:null
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

        <div className='container mt-4 main-content'>
          <div className="product-buttons">
            <button
              className={`btn ${activeButton === 'new' ? 'active' : ''}`}
              onClick={() => handleButtonClick('new')}
            >
              ⏰ New product
            </button>
            <button
              className={`btn ${activeButton === 'hot' ? 'active' : ''}`}
              onClick={() => handleButtonClick('hot')}
            >
              🔥 Hot product
            </button>
            <button
              className={`btn ${activeButton === 'highlyRated' ? 'active' : ''}`}
              onClick={() => handleButtonClick('highlyRated')}
            >
              🌟 Highly rated
            </button>
          </div>

          <div className="row">
          {products.map((product) => (
              <CardContent product={product}/>
          ))}
          </div>

        </div>

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
            <span></span>Featured Categories
          </h2>
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
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>5 Cây Cơ xin kính chào quý kháchhhh =))))</Modal.Title>
        </Modal.Header>
        <Modal.Body>Có vẻ như bạn chưa đăng nhập nhỉ??</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleLogin}>
            Oke dô nè
          </Button>
          <Button variant="outline-primary" onClick={handleRegister}>
            Toii chưa có tài khoản
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Thôii
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}