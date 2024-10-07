// ProfileInformation.js
import React from 'react';
import './Purchase.css'; // Import a CSS file for custom styles

const Purchase = () => {
  return (
    <div className="purchase-container">
      <h4 className='text-center'><strong>Purchase</strong></h4>
      <div className="table-container">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date</th>
              <th scope="col">Address</th>
              <th scope="col">Payment</th>
              <th scope="col">Status</th>
              <th scope="col">Support</th>
              <th scope="col">Support Times</th>
              <th scope="col">Question</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>Nguyen Van A, Quan 7, TPHCM</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <button type="button" className="btn btn-outline-warning">Ask for</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Jacob</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>Thornton</td>
              <td>Thornton</td>
              <td>
                <button type="button" className="btn btn-outline-warning">Ask for</button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>the Bird</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>
                <button type="button" className="btn btn-outline-warning">Ask for</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchase;
