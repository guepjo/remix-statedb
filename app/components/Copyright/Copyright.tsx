import React from 'react';

const Copyright = () => {
  return (
    <div
      style={{
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      © {new Date().getFullYear()}{' '}
      <a
        target="blank"
        href="https://docs.google.com/document/d/1-ZmrLCzgyakYndhoT7uHPHqvOXjhArsYeU3kXJwBHPQ/edit#heading=h.hmogsghmufas"
      >
        FMaL
      </a>
    </div>
  );
};

export default Copyright;
