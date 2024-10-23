import React from 'react'
import { useLocation } from 'react-router-dom'
import '../../../../util/GlobalStyle/GlobalStyle.css';
import CardContent from '../card/CardContent';
import './ProductByCate.css'

export default function ProductByName() {
  const location = useLocation();
  const { state } = location;
  const searchResults = state?.searchResults || [];
  console.log(searchResults)

  return (
    <div className='fixed-header' style={{ minHeight: '350px' }}>
        <h1 className='text-center'>Search Result</h1>
      <div className="container-xl product-list-container">
        {searchResults.length === 0 ? (
        <div className="text-center" style={{fontSize: '2rem', color: '#E4E0E1'}}>
          <i class="bi bi-emoji-dizzy-fill text-dark"></i>
          <h3 >No search results found.</h3>
          <p>Please try a different search term.</p>
        </div>
      ) : (
        <div className="row mt-3">
          {searchResults.map((product) => (
            <CardContent key={product.id} product={product} />
          ))}
        </div>
      )}
        </div>
    </div>
  );
}
