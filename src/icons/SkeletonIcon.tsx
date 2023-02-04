import React from 'react';
export const SkeletonIcon = (props: any) => {
  return (
    <div {...props}>
      <svg width='372' height='36' viewBox='0 0 372 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect width='20' height='6' rx='3' fill='#E3E3FC' />
        <rect y='10' width='372' height='6' rx='3' fill='#E3E3FC' />
        <rect y='20' width='372' height='6' rx='3' fill='#E3E3FC' />
        <rect y='30' width='30' height='6' rx='3' fill='#E3E3FC' />
      </svg>
    </div>
  );
};
