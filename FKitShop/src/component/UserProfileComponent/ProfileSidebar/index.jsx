// ProfileSidebar.js
import React from 'react';
import './index.module.css'
const ProfileSidebar = () => {
  return (
    <div className="text-center">
      <h4>My Profile</h4>
      <img
        src="./image/user.png" // Replace this with your avatar image path
        alt="Profile"
        className="profile-avatar mb-3"
      />
      <button className="btn btn-outline-dark w-100 mb-2">Information</button>
      <button className="btn btn-outline-dark w-100 mb-2">Purchase</button>
      <button className="btn btn-outline-dark w-100 mb-2">Update Account</button>
      <button className="btn btn-outline-dark w-100">Change Password</button>
    </div>
  );
};

export default ProfileSidebar;
