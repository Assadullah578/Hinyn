import React from 'react';

const Avatar = ({ image, isOnline }) => {
  return (
    <div
      style={{
        marginRight: '0px',
        marginLeft: '100px',
        background: '#fff',
        padding: '1px',
      }}
    >
      <div style={{ width: '20px', height: '20px', borderRadius: 100 }}>
        <img src={image} alt="#" />
      </div>
      <span className={`isOnline ${isOnline}`}></span>
    </div>
  );
};

export default Avatar;
