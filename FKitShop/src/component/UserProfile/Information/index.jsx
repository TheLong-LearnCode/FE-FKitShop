// ProfileInformation.js
import { Alert } from 'antd';
import React, { useState } from 'react';

export default function ProfileInformation({ userInfo }) {
  const [showMessage, setShowMessage] = useState(true); // State to control message visibility

  if (!userInfo) {
    return (
      <Alert
        message="Important Notice"
        description="Press CTRL+R to reload the profile!"
        type="info"
        closable
        onClose={() => setShowMessage(false)} // Hide the message when closed
        showIcon
      />
    )
  }
  const { fullName, dob, phoneNumber, email } = userInfo;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  return (
    <>
      <div className="col-md-8">
        <h4 className='text-center'><strong>Information</strong></h4>
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </>
  );
}
