// ProfileSidebar.js
import React from 'react';
import clsx from 'clsx'; // Using clsx to handle class names
import './index.module.css';

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const handleOnclick = (id) => () => {
    setActiveTab(id); // Update the active tab in UserProfile component
  };

  return (
    <div className="text-center">
      <h4>My Profile</h4>
      <img
        src="/img/user.png" // Replace this with your avatar image path
        alt="Profile"
        className="profile-avatar mb-3"
      />
      <button
        className={clsx('btn btn-outline-dark w-100 mb-2', {
          active: activeTab === 'information'
        })}
        onClick={handleOnclick('information')}
      >
        Information
      </button>

      <button
        className={clsx('btn btn-outline-dark w-100 mb-2', {
          active: activeTab === 'purchase'
        })}
        onClick={handleOnclick('purchase')}
      >
        Purchase
      </button>

      <button
        className={clsx('btn btn-outline-dark w-100 mb-2', {
          active: activeTab === 'updateAccount'
        })}
        onClick={handleOnclick('updateAccount')}
      >
        Update Account
      </button>

      <button
        className={clsx('btn btn-outline-dark w-100 mb-2', {
          active: activeTab === 'changePassword'
        })}
        onClick={handleOnclick('changePassword')}
      >
        Change Password
      </button>

      <button
        className={clsx('btn btn-outline-dark w-100', {
          active: activeTab === 'myLab'
        })}
        onClick={handleOnclick('myLab')}
      >
        My Lab
      </button>
    </div>
  );
}
