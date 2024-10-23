import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../../../util/GlobalStyle/GlobalStyle.css';
import './ProductByCate.css'
import api from '../../../../config/axios';
import { GET } from '../../../../constants/httpMethod';
import CardContent from '../card/CardContent';

export default function ProductList() {
  const { categoryID } = useParams()
  const [cate, setCate] = useState(null);
  const [activeButton, setActiveButton] = useState('');
  const [products, setProducts] = useState([]);
  const [ascProducts, setAscProducts] = useState([]);
  const [descProducts, setDescProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await api[GET](`/categories/${categoryID}`);
        setCate(response.data.data);
        setActiveButton('');
      } catch (err) {
        console.error("Error fetching lab details: ", err);
      }
    }
    fetchCategoryName();

  }, [categoryID])

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  }

  useEffect(() => {
    const fetchCateProduct = async () => {
      try {
        const response = await api[GET](`/product/by-category/${categoryID}`);
        setProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching lab details: ", err);
      }
    }
    fetchCateProduct();

  }, [categoryID])

  useEffect(() => {
    const ascCateProduct = async () => {
      try {
        const response = await api[GET](`/product/price-asc/${categoryID}`);
        setAscProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching lab details: ", err);
      }
    }
    ascCateProduct();

  }, [categoryID])

  useEffect(() => {
    const descCateProduct = async () => {
      try {
        const response = await api[GET](`/product/price-desc/${categoryID}`);
        setDescProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching lab details: ", err);
      }
    }
    descCateProduct();

  }, [categoryID])

  return (
    <div className='fixed-header' style={{ minHeight: '350px' }}>
      <div className="container-xl product-list-container">
        <h2 key={cate?.categoryID}>
          <span></span>{cate?.categoryName}
        </h2>

        <div className="product-list-buttons">
          <button
            className={`btn-asc btn ${activeButton === 'lth' ? 'active' : ''}`}
            onClick={() => handleButtonClick('lth')}
          >
            Low to high price
          </button>

          <button
            className={`btn-asc btn ${activeButton === 'htl' ? 'active' : ''}`}
            onClick={() => handleButtonClick('htl')}
          >
            High to low price
          </button>

          <div className="row mt-3">
            {activeButton === '' &&
              products.map((product) => (
                <CardContent product={product} />
              ))
            }

            {activeButton === 'lth' &&
              ascProducts.map((product) => (
                <CardContent product={product} />
              ))
            }

            {activeButton === 'htl' &&
              descProducts.map((product) => (
                <CardContent product={product} />
              ))
            }
          </div>
        </div>
      </div>

    </div>
  )
}
