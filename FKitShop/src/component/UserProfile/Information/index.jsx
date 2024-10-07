// ProfileInformation.js
import React from 'react';

export default function ProfileInformation({ userInfo }) {
  if (!userInfo) {
    return <p>Loading...</p>;
  }
  const { fullName, dob, phoneNumber, email } = userInfo;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  return (
    <>
      <div className="col-md-8">
        <h4 className='text-center'>Information</h4>
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Age:</strong> {age} {/* Example year of birth */}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </>
  );
}
