// ProfileInformation.js
import React from 'react';

const Purchase = () => {
  return (
    <div>
      <h4>Purchase</h4>
      <p><strong>Name:</strong> userName</p>
      <p><strong>Age:</strong> {new Date().getFullYear() - 1990} {/* Example year of birth */}</p>
      <p><strong>Phone Number:</strong> 123-456-7890</p>
      <p><strong>Email:</strong> email@example.com</p>
    </div>
  );
};

export default Purchase;
