// ProfileInformation.js
import React from 'react';

const Purchase = () => {
  return (
    <div>
      <h4 className='text-center'>Purchase</h4>
      <div>
        <table class="table table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date</th>
              <th scope="col">Address</th>
              <th scope="col">Payment</th>
              <th scope="col">Status</th>
              <th scope="col">Support</th>
              <th scope="col">Support Times</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Jacob</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>Thornton</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>the Bird</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchase;
