// ProfileInformation.js
import React from 'react';

const ProfileInformation = () => {
  return (
    <div>
      <h4>Information</h4>
      <p><strong>Name:</strong> userName</p>
      <p><strong>Age:</strong> {new Date().getFullYear() - 1990} {/* Example year of birth */}</p>
      <p><strong>Phone Number:</strong> 123-456-7890</p>
      <p><strong>Email:</strong> email@example.com</p>
    </div>
  );
};

export default ProfileInformation;
