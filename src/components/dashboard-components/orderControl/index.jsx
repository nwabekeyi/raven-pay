// src/components/OrderControl.js
import React, { useState } from 'react';
import SegmentedControl from '../../trading-components/segmented-control'; // Ensure the path is correct
import './orderControl.css';

const OrderControl = () => {
  const [activeSegment, setActiveSegment] = useState(0);

  const handleSegmentChange = (index) => {
    setActiveSegment(index);
    // Additional logic when the segment changes can be added here
  };

  const segments = ['Open Order', 'Positions', 'Order History', 'Trade History'];

  return (
    <div className="order-control">
      <SegmentedControl
        segments={segments}
        onSegmentChange={handleSegmentChange}
        activeStyle="order"
      />

      <div className='order-page'>
         <h1>
         No Open Orders
         </h1>
         <p>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Id pulvinar nullam sit imperdiet pulvinar.
         </p>
      </div>
    </div>
  );
};

export default OrderControl;
